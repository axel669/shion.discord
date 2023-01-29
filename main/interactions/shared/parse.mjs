export default (text) => ({
    channel: text.match(/none|<#(\d+)>/)[1] ?? null,
    roles: [...text.matchAll(/<@\&(?<id>\d+)>/g)].map(
        result => result.groups.id
    )
})
