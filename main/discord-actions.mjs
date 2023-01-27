import { roles, discordType, responseType } from "#discord"

import commands from "./commands/mapping.mjs"

const roleAction = {
    "role-add": roles`put`,
    "role-remove": roles`delete`,
}
const roleMessage = {
    "role-add": "Enjoy your role!",
    "role-remove": "Role removed!",
}

const newState = {
    roles: (evt) => evt.data.values.map(
        id => evt.data.resolved.roles[id].name
    ),
    channel: (evt) => Object.values(evt.data.resolved.channels)[0].name
}
export default {
    [discordType.SlashCommand]: async (evt) => {
        const command = evt.data.name

        const commandResponse = await commands[command](evt)
        console.log(commandResponse)

        return commandResponse
    },
    [discordType.Interaction]: async (evt) => {
        console.log(JSON.stringify(evt.data, null, 4))
        if (evt.data.component_type !== 2) {
            const prev = JSON.parse(evt.message.content)
            const state = newState[evt.data.custom_id](evt)
            return {
                type: responseType.UPDATE_MESSAGE,
                data: {
                    content: JSON.stringify({ prev, state }, null, 2)
                }
            }
        }
        const [action, roleID] = evt.data.custom_id.split(":")
        const userID = evt.member.user.id

        await roleAction[action](
            `/guilds/${evt.guild_id}/members/${userID}/roles/${roleID}`
        )

        return {
            type: responseType.MESSAGE,
            data: {
                content: roleMessage[action],
                flags: 1 << 6,
            },
        }
    }
}
