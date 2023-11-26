import discord from "#discord"

export default async (message, info) => {
    const guildID = message.guild_id
    const userID = message.member.user.id
    const roleID = info.meta
    const url = `/guilds/${guildID}/members/${userID}/roles/${roleID}`

    const hasRole = message.member.roles.includes(roleID)
    if (hasRole === true) {
        await discord.api.roles.delete(url)
        return {
            type: discord.response.message,
            data: {
                flags: discord.flag.ephemeral,
                content: `Removed the <@&${roleID}> role`
            }
        }
    }

    await discord.api.roles.put(url)
    return {
        type: discord.response.message,
        data: {
            flags: discord.flag.ephemeral,
            content: `Gave you the <@&${roleID}> role :)`
        }
    }
}
