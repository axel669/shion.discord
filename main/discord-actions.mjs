import discord from "#discord"

import importdir from "#import"

const commands = await importdir(import.meta, "./commands")
const interactions = await importdir(import.meta, "./interactions")

const interactionHandler = async (evt) => {
    console.log(JSON.stringify(evt, null, 4))
    const [source, meta = null] = evt.data.custom_id.split(":")
    const [command, target] = source.split(".")

    const info = { source, meta, command, target }

    const response = await interactions[source]?.(evt, info) ?? null

    console.log(
        JSON.stringify(response, null, 4)
    )

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
}

export default {
    [discord.event.command]: async (evt) => {
        const command = evt.data.name

        const commandResponse = await commands[command](evt)

        return commandResponse
    },
    [discord.event.component]: interactionHandler,
    [discord.event.modal]: interactionHandler,
}
