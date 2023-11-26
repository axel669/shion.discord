let token = null

export const init = (tok) => token = tok

const baseURL = "https://discord.com/api/v10/"

const request = async (method, url, type, data) => {
    const response = await fetch(url, {
        method,
        headers: {
            "Authorization": `Bot ${token}`
        },
        body: data && JSON.stringify(data)
    })
    return { response, data: await response[type]() }
}

const reqGroup = (type) => ({
    get: (url) => request("GET", `${baseURL}${url}`, type),
    delete: (url) => request("DELETE", `${baseURL}${url}`, type),
    put: (url) => request("PUT", `${baseURL}${url}`, type),
    post: ({ url, data }) => request("POST", `${baseURL}${url}`, type, data),
    patch: ({ url, data }) => request("PATCH", `${baseURL}${url}`, type, data),
})

export default {
    init,
    ...reqGroup("json"),
    roles: reqGroup("text")
}
