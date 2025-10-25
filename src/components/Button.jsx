import React from 'react'

function Button({text, bgColor,rounded, padding}) {
  return (
    <button className={`bg-${bgColor} rounded-${rounded} p-${padding}}`}>{text}</button>
  )
}

export default Button