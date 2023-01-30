import discord from "#discord"

const roles = discord.api.use({ type: "text" })

export default async (evt, info) => {
    const guildID = evt.guild_id
    const userID = evt.member.user.id
    const roleID = info.meta
    const url = `/guilds/${guildID}/members/${userID}/roles/${roleID}`

    if (evt.member.roles.includes(info.meta) === true) {
        await roles`delete`(url)
        return {
            type: discord.response.message,
            data: {
                // discord flag for ephemeral
                flags: 1 << 6,
                content: `Removed <@&${roleID}>`
            }
        }
    }

    await roles`put`(url)
    return {
        type: discord.response.message,
        data: {
            // discord flag for ephemeral
            flags: 1 << 6,
            content: `Added <@&${roleID}> :)`
        }
    }
}
