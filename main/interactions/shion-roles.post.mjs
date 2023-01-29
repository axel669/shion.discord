import discord from "#discord"
import parse from "./shared/parse.mjs"

export default async (evt) => {
    const info = parse(evt.message.embeds[0].description)
    const messageInfo = await discord.api`post`({
        url: `channels/${info.channel}/messages`,
        data: {
            content: `Test?`
        }
    })
    console.log(JSON.stringify(messageInfo, null, 4))

    return {
        type: discord.response.message,
        data: {
            flags: 1 << 6,
            content: "posted?"
        }
    }
}
