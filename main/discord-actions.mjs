import discord from "#discord"

import commands from "./commands/mapping.mjs"
import interactions from "./interactions/main.mjs"

// const roleAction = {
//     "role-add": roles`put`,
//     "role-remove": roles`delete`,
// }
// const roleMessage = {
//     "role-add": "Enjoy your role!",
//     "role-remove": "Role removed!",
// }
export default {
    [discord.event.command]: async (evt) => {
        const command = evt.data.name

        const commandResponse = await commands[command](evt)

        return commandResponse
    },
    [discord.event.component]: async (evt) => {
        // console.log(JSON.stringify(evt, null, 4))
        const [source, meta] = evt.data.custom_id.split(":")
        const [command, target] = source.split(".")

        const info = { source, meta, command, target }

        const response = await interactions[source]?.(evt, info) ?? null

        if (response === null) {
            return {
                type: discord.response.message,
                data: {
                    content: "Something went wrong :(",
                    flags: 1 << 6,
                },
            }
        }

        return response

        // const [action, roleID] = evt.data.custom_id.split(":")
        // const userID = evt.member.user.id

        // await roleAction[action](
        //     `/guilds/${evt.guild_id}/members/${userID}/roles/${roleID}`
        // )

        // return {
        //     type: responseType.MESSAGE,
        //     data: {
        //         content: roleMessage[action],
        //         flags: 1 << 6,
        //     },
        // }
    }
}
