import React from 'react'

const FontAwesome = ({
  icon,
  brand = false,
  spin = false,
  className,
  ...otherProps
}) => (
  <span
    style={{ display: 'inline-block', width: '1.25em' }}
    className={`text-center ${spin ? 'fa-spin' : ''} ${className}`}
  >
    <i {...otherProps} className={`${brand ? 'fab' : 'fa'} fa-${icon}`} />
  </span>
)

export default FontAwesome
