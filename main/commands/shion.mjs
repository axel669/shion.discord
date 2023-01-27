import { discord } from "#discord"
import color from "#color"

export default async (evt) => {
    const args = evt.data.options.reduce(
        (opts, item) => {
            opts[item.name] = item
            return opts
        },
        {}
    )

    const roles = await discord`get`(`/guilds/${evt.guild_id}/roles`)
    const role = roles.find(
        (role) => role.id === args.role.value
    )

    const username = evt.member.nick ?? evt.member.user.username

    const msgInfo = await discord`post`(
        `channels/${args.channel.value}/messages`,
        {
            content: null,
            "embeds": [
                {
                    "title": args.title.value,
                    "description": args.blurb.value,
                    "color": color.convertHex(
                        args.color?.value ?? "#008080"
                    ),
                    "author": {
                        "name": `By ${username}`
                    }
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 1,
                            label: "Add Role",
                            custom_id: `role-add:${args.role.value}`,
                        },
                        {
                            type: 2,
                            style: 4,
                            label: "Remove Role",
                            custom_id: `role-remove:${args.role.value}`,
                        },
                    ]
                }
            ],
        }
    )

    return {
        type: 4,
        data: {
            content: `Role granter made for ${role.name}!`,
            flags: 1 << 6,
        },
    }
}
