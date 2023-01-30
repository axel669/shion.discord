const parse = (text) => ({
    channel: text.match(/none|<#(\d+)>/)[1] ?? null,
    roles: [...text.matchAll(/<@\&(?<id>\d+)>/g)].map(
        result => result.groups.id
    ),
    title: text.split("\n")[1],
    message: text.split("\n")[3],
})
const format = (state) => [
    "**Title**",
    state.title,
    "**Message**",
    state.message,
    "**Channel**",
    (state.channel === null) ? "none" : `<#${state.channel}>`,
    "**Roles**",
    ...(
        state.roles.length === 0
        ? ["none"]
        : state.roles.map(
            id => `<@&${id}>`
        )
    ),
].join("\n")

export default { parse, format }
