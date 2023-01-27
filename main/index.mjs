import nacl from "tweetnacl"

import { responseType } from "#discord"
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
    const ed = event.headers["x-signature-ed25519"] ?? null
    const time = event.headers["x-signature-timestamp"] ?? null

    const rawData = event.body

    const isVerified = (
        ed !== null
        && time !== null
        && nacl.sign.detached.verify(
            Buffer.from(`${time}${rawData}`),
            Buffer.from(ed, "hex"),
            Buffer.from(process.env.public_key, "hex")
        )
    )

    if (isVerified == false) {
        return {
            statusCode: 401,
            body: "Nope"
        }
    }

    const evt = JSON.parse(rawData)

    /*
    event type 1 is discord making sure we are validating things correctly
    */
    if (evt.type === 1) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                type: responseType.PONG
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
