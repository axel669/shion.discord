import discord from "#discord"
import state from "./shared/$state.mjs"

export default (evt, info) => {
    const prev = state.parse(evt.message.embeds[0].description)

    const components = evt.data.components
    const title = components[0].components[0].value
    const message = components[1].components[0].value

    const next = { ...prev, title, message }

    return {
        type: discord.response.updateMessage,
        data: {
            embeds: [
                {
                    ...evt.message.embeds[0],
                    description: state.format(next)
                }
            ]
        }
    }
}
