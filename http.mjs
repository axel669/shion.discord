let token = null
const init = (tok) => token = tok

const get = async (url) => {
    const res = await fetch(
        `https://discord.com/api/v10/${url}`,
        {
            headers: {
                "Authorization": `Bot ${token}`
            },
        }
    )
    return await res.json()
}
const post = async (url, data) => {
    const res = await fetch(
        `https://discord.com/api/v10/${url}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${token}`
            },
            body: JSON.stringify(data),
        }
    )
    return await res.json()
}
const put = async (url) => {
    await fetch(
        `https://discord.com/api/v10/${url}`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bot ${token}`
            },
        }
    )
}
const del = async (url) => {
    await fetch(
        `https://discord.com/api/v10/${url}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bot ${token}`
            },
        }
    )
}

export default { get, post, put, del, init }
