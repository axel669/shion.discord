import discord, { component } from "#discord"

import state from "./shared/$state.mjs"

export default (evt, info) => {
    const current = state.parse(evt.message.embeds[0].description)
    console.log(current)
    return {
        type: discord.response.modal,
        data: {
            title: "Edit Details",
            custom_id: "shion-roles.modal",
            components: [
                component.row(
                    component.textInput({
                        id: "text-title",
                        label: "Title",
                        value: current.title,
                    })
                ),
                component.row(
                    component.textInput({
                        id: "text-desc",
                        label: "Message",
                        value: current.message,
                    })
                )
            ]
        }
    }
}
