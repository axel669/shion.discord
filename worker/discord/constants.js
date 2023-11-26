export const event = {
    ping: 1,
    command: 2,
    component: 3,
    modal: 5,
}
export const response = {
    pong: 1,
    message: 4,
    updateMessage: 7,
    modal: 9
}

export const eventName = Object.fromEntries(
    Object.entries(event).map(
        ([ key, value ]) => [value, key]
    )
)
