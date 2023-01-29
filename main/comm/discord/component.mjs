const type = {
    row: 1,
    button: 2,
    stringSelect: 3,
    textInput: 4,
    userSelect: 5,
    roleSelect: 6,
    mentionableSelect: 7,
    channelSelect: 8,
}
const buttonStyle = {
    primary: 1,
    secondary: 2,
    success: 3,
    danger: 4,
    link: 5,
}

const row = (...children) => ({
    type: type.row,
    components: children,
})
const button = ({id, label, style, emoji, disabled, url}) => ({
    type: type.button,
    custom_id: id,
    label,
    emoji,
    url,
    disabled,
    style: (url !== undefined) ? buttonStyle.link : style
})
button.style = buttonStyle
const roleSelect = ({ id, label, disabled, min, max }) => ({
    type: type.roleSelect,
    custom_id: id,
    placeholder: label,
    disabled,
    min_values: min,
    max_values: max,
})
const channelSelect = ({ id, label, disabled, min, max }) => ({
    type: type.channelSelect,
    custom_id: id,
    placeholder: label,
    disabled,
    min_values: min,
    max_values: max,
})

export default {
    type,
    button,
    row,
    roleSelect,
    channelSelect,
}
