import nacl from "tweetnacl"

import api from "./api.mjs"
import component from "./component.mjs"

const event = {
    ping: 1,
    command: 2,
    component: 3,
    modal: 5,
}
const response = {
    pong: 1,
    message: 4,
    updateMessage: 7,
    modal: 9
}

const validate = (event, key) => {
    const signature = event.headers["x-signature-ed25519"] ?? null
    const time = event.headers["x-signature-timestamp"] ?? null

    const rawData = event.body

    const valid = (
        signature !== null
        && time !== null
        && nacl.sign.detached.verify(
            Buffer.from(`${time}${rawData}`),
            Buffer.from(signature, "hex"),
            Buffer.from(key, "hex")
        )
    )

    if (valid === false) {
        return null
    }

    return JSON.parse(rawData)
}

export { component }
export default {
    api,
    event,
    response,
    validate,
}
