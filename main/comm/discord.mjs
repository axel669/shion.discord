import http from "@labyrinthos/http/node"

const discord = http({
    baseURL: "https://discord.com/api/v10/",
    headers: {
        "Authorization": `Bot ${process.env.token}`
    }
})
const roles = discord.use({ type: "text" })

const discordType = {
    SlashCommand: 2,
    Interaction: 3,
}

const responseType = {
    PONG: 1,
    MESSAGE: 4,
    UPDATE_MESSAGE: 7
}

export { discord, roles, discordType, responseType }
