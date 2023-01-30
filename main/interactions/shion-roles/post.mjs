import discord, { component } from "#discord"
import color from "#color"

import state from "./shared/$state.mjs"

const upsertMessage = async (guildID, current, msgID) => {
    const roles = await discord.api`get`(
        `guilds/${guildID}/roles`
    )
    // const description =
    //     `does it look good? <@&${info.roles[0]}>\n<t:${Math.floor(Date.now() / 1000)}:F>`
    const data = {
        allowed_mentions: [],
        embeds: [
            {
                title: current.title,
                description: current.message,
                color: color.convertHex("#00aacc")
            }
        ],
        components: [
            component.row(
                ...current.roles.map(
                    id => component.button({
                        label: roles.data.find(role => role.id === id).name,
                        id: `shion-roles.toggle:${id}`,
                        style: component.button.style.primary,
                    })
                )
            )
        ]
    }
    if (msgID === null) {
        const messageInfo = await discord.api`post`({
            url: `channels/${current.channel}/messages`,
            data,
        })
        const { id } = messageInfo.data
        return id
    }

    const msgInfo = await discord.api`patch`({
        url: `channels/${current.channel}/messages/${msgID}`,
        data
    })

    return msgID
}
const constructMessageURL = (guildID, channel, msgID) =>
    `https://discord.com/channels/${guildID}/${channel}/${msgID}`

export default async (evt, info) => {
    const current = state.parse(evt.message.embeds[0].description)
    const msgID = await upsertMessage(evt.guild_id, current, info.meta)
    const url = constructMessageURL(evt.guild_id, current.channel, msgID)

    return {
        type: discord.response.updateMessage,
        data: {
            components: [
                ...evt.message.components.slice(0, 3),
                component.row(
                    component.button({
                        id: `shion-roles.post:${msgID}`,
                        style: component.button.style.success,
                        label: "Update"
                    }),
                    component.button({
                        url,
                        label: "View Post",
                    })
                )
            ]
        }
    }
}
