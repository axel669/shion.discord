import nacl from "tweetnacl"
import { Buffer } from "node:buffer"

const validate = async (req, key) => {
    const signature = req.headers.get("x-signature-ed25519") ?? null
    const time = req.headers.get("x-signature-timestamp") ?? null

    const rawData = await req.text()

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

export default validate
