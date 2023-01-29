import http from "@labyrinthos/http/node"

const api = http({
    baseURL: "https://discord.com/api/v10/",
    headers: {
        "Authorization": `Bot ${process.env.token}`
    }
})
const roles = api.use({ type: "text" })
api.roles = roles

export default api
