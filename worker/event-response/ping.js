import discord from "#discord"

export default (message, env, req) => {
    return { type: discord.response.pong }
    // return Response.json(
    //     { type: discord.response.pong },
    //     { headers: { "Cache-Control": "no-cache" } }
    // )
}
