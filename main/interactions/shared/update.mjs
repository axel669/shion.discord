import discord from "#discord"
import parse from "./parse.mjs"

export default (evt, info, stateUpdate) => {
    const { target } = info
    const [embed] = evt.message.embeds
    const desc = embed.description
    const prev = parse(desc)
    // const prev = {
    //     channel: desc.match(/none|<#(\d+)>/)[1] ?? null,
    //     roles: [...desc.matchAll(/<@\&(?<id>\d+)>/g)].map(
    //         result => result.groups.id
    //     )
    // }
    const state = {
        ...prev,
        [target]: stateUpdate(evt),
    }
    const channelText =
        (state.channel === null)
            ? "none"
            : `<#${state.channel}>`
    const roleText =
        (state.roles.length === 0)
            ? "none"
            : state.roles.map(id => `- <@&${id}>`).join("\n")
    const newDesc =
        `**Channel**\n${channelText}\n**Roles**\n${roleText}`
    return {
        type: discord.response.updateMessage,
        data: {
            embeds: [
                {
                    ...embed,
                    description: newDesc,
                }
            ]
        }
    }
}
