import nacl from "tweetnacl"
import {Buffer} from "buffer"

import http from "./http.mjs"
import actions from "./actions.mjs"

const redirectURL = "https://discord.com/oauth2/authorize?client_id=1041427678605090838&permissions=1497064766528&scope=applications.commands%20bot"

export default {
    async fetch(req, env) {
        if (req.method === "GET") {
            return Response.redirect(redirectURL, 301)
        }
        const ed = req.headers.get("x-signature-ed25519") ?? null
        const time = req.headers.get("x-signature-timestamp") ?? null

        const rawBody = await req.text()

        const isVerified = (
            ed !== null
            && time !== null
            && nacl.sign.detached.verify(
                Buffer.from(`${time}${rawBody}`),
                Buffer.from(ed, "hex"),
                Buffer.from(env.PUBLIC_KEY, "hex")
            )
        )

        if (isVerified == false) {
            return new Response("Nope", { status: 401 })
        }

        const evt = JSON.parse(rawBody)

        if (evt.type === 1) {
            return new Response(
                JSON.stringify({
                    type: 1
                }),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        }

        http.init(env.BOT_TOKEN)
        const response = await actions[evt.type](evt)

        return new Response(
            JSON.stringify(response),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}
