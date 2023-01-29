import update from "./shared/update.mjs"

export default (evt, info) => update(
    evt,
    info,
    (evt) => evt.data.values
)
