import discord, { component } from "#discord"
import color from "#color"

export default async (evt) => {
    return {
        type: discord.response.message,
        data: {
            embeds: [
                {
                    title: "Shion Role Grant Setup",
                    color: color.convertHex("#00aacc"),
                    description: "**Channel**\nnone\n**Roles**\nnone",
                }
            ],
            components: [
                component.row(
                    component.channelSelect({
                        id: "shion-roles.channel",
                        label: "Channel to post in"
                    })
                ),
                component.row(
                    component.roleSelect({
                        id: "shion-roles.roles",
                        label: "Roles",
                        min: 1,
                        max: 10,
                    })
                ),
                component.row(
                    component.button({
                        id: "shion-roles.post",
                        label: "Post",
                        style: component.button.style.success,
                    })
                ),
            ]
        },
    }
}
