import { discord, responseType } from "#discord"
// import color from "#color"

export default async (evt) => {
    // const args = evt.data.options.reduce(
    //     (opts, item) => {
    //         opts[item.name] = item
    //         return opts
    //     },
    //     {}
    // )

    // const roles = await discord`get`(`/guilds/${evt.guild_id}/roles`)
    // const role = roles.find(
    //     (role) => role.id === args.role.value
    // )

    // const username = evt.member.nick ?? evt.member.user.username

    const msgInfo = await discord`post`({
        url: `channels/${evt.channel_id}/messages`,
        data: {
            content: "{}",
            // "embeds": [
            //     {
            //         "title": args.title.value,
            //         "description": args.blurb.value,
            //         "color": color.convertHex(
            //             args.color?.value ?? "#008080"
            //         ),
            //         "author": {
            //             "name": `By ${username}`
            //         }
            //     }
            // ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 8,
                            placeholder: "Select Channel",
                            custom_id: `channel`,
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 6,
                            placeholder: "Select Roles",
                            custom_id: "roles",
                            min_values: 1,
                            max_values: 10,
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 3,
                            label: "Post",
                            custom_id: "submit"
                        }
                    ]
                }
            ]
        }
    })
    console.log(msgInfo)

    return {
        type: responseType.MESSAGE,
        data: {
            content: `Process started?`,
            // per discord docs for ephemeral
            flags: 1 << 6,
        },
    }
}
