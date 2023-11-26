import discord from "#discord"
import responses from "./component/responses.js"

export default async (message, env, req) => {
    const [source, meta = null] = message.data.custom_id.split(":")
    const [command, target] = source.split(".")

    return await responses[target](
        message,
        { source, meta, command, target }
    )
}
