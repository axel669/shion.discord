import discord from "#discord"
import state from "./$state.mjs"

export default (evt, info, stateUpdate) => {
    const { target } = info
    const [embed] = evt.message.embeds
    const desc = embed.description
    const prev = state.parse(desc)
    const next = {
        ...prev,
        [target]: stateUpdate(evt),
    }
    // const channelText =
    //     (state.channel === null)
    //         ? "none"
    //         : `<#${state.channel}>`
    // const roleText =
    //     (state.roles.length === 0)
    //         ? "none"
    //         : state.roles.map(id => `- <@&${id}>`).join("\n")
    // const newDesc =
    //     `**Channel**\n${channelText}\n**Roles**\n${roleText}`
    return {
        type: discord.response.updateMessage,
        data: {
            embeds: [
                {
                    ...embed,
                    description: state.format(next),
                },
                ...evt.message.embeds.slice(1)
            ]
        }
    }
}
