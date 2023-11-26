import discord from "#discord"
import eventResponse from "./event-response/responses.js"

export default {
    async fetch(req, env) {
        if (req.method !== "POST") {
            return new Response("Hi, I'm Shion for Discord")
        }

        const discordEvent = await discord.validate(req, env.PUBLIC_KEY)
        if (discordEvent === null) {
            return new Response(
                "nopers",
                { status: 401 }
            )
        }

        const eventName = discord.eventName[discordEvent.type]
        const handler = eventResponse[eventName]

        if (handler === undefined) {
            return new Response("Not supported", { status: 400 })
        }

        discord.api.init(env.BOT_TOKEN)
        const responseData = await handler(discordEvent, env, req)
        return Response.json(
            responseData,
            { headers: { "Cache-Control": "no-cache" } }
        )
    }
}
