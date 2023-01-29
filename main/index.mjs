import discord from "#discord"
import actions from "./discord-actions.mjs"

const redirectURL = "https://discord.com/oauth2/authorize?client_id=1041427678605090838&permissions=1497064766528&scope=applications.commands%20bot"

export const handler = async (event) => {
    const method = event.requestContext.http.method.toLowerCase()

    if (method === "get") {
        return {
            statusCode: 200,
            body: "Hi, I'm Shion for Discord"
        }
    }

    const evt = discord.validate(event, process.env.public_key)
    if (evt === null) {
        return {
            statusCode: 401,
            body: "Nope"
        }
    }

    if (evt.type === discord.event.ping) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                type: discord.response.pong
            })
        }
    }

    const response = await actions[evt.type](evt)
    // console.log(JSON.stringify(evt, null, 4))

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(response)
    }
}
