import http from "./http.mjs"

const messageType = {
    SlashCommand: 2,
    Interaction: 3,
}
const roleAction = {
    "role-add": http.put,
    "role-remove": http.del,
}
const roleMessage = {
    "role-add": "Enjoy your role!",
    "role-remove": "Role removed!",
}
const convertHex = (hex) => parseInt(hex.slice(1), 16)
export default {
    [messageType.SlashCommand]: async (evt) => {
        const args = evt.data.options.reduce(
            (opts, item) => {
                opts[item.name] = item
                return opts
            },
            {}
        )

        const roles = await http.get(`/guilds/${evt.guild_id}/roles`)
        const role = roles.find(
            (role) => role.id === args.role.value
        )

        const username = evt.member.nick ?? evt.member.user.username

        const msgInfo = await http.post(
            `channels/${args.channel.value}/messages`,
            {
                content: null,
                "embeds": [
                    {
                        "title": args.title.value,
                        "description": args.blurb.value,
                        "color": convertHex(args.color?.value ?? "#008080"),
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
    },
    [messageType.Interaction]: async (evt) => {
        const [action, roleID] = evt.data.custom_id.split(":")
        const userID = evt.member.user.id

        await roleAction[action](
            `/guilds/${evt.guild_id}/members/${userID}/roles/${roleID}`
        )

        return {
            type: 4,
            data: {
                content: roleMessage[action],
                flags: 1 << 6,
            },
        }
    }
}
