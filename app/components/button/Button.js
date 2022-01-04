import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {shell} from "electron"

import buttonStyle from './Button.module.scss'

const Button = ({
  to,
  href,
  target,
  className,
  children,
  padding,
  primary,
  danger,
  disabled,
  ...other
}) => {
  let Tag = null
  if (to) {
    Tag = Link
  } else if (href) {
    Tag = 'a'
  } else {
    // eslint-disable-next-line no-console
    console.error('Tag for Button not specified')
  }

  const classNamesArray = [buttonStyle.button]
  if (className) {
    classNamesArray.push(className)
  }
  if (padding) {
    classNamesArray.push(buttonStyle.padding)
  }
  if (primary) {
    classNamesArray.push(buttonStyle.primary)
  }
  if (danger) {
    classNamesArray.push(buttonStyle.danger)
  }
  if (disabled) {
    classNamesArray.push(buttonStyle.disabled)
  }
  const classNames = classNamesArray.join(' ')

  const onClick = () => {
    if (!disabled && href) {
      shell.openExternal(href)
    }
  }

  return (
    <Tag
      to={!disabled ? to : ""}
      onClick={onClick}
      target={target || null}
    >
      <div
        className={classNames}
        {...other}
      >
        {children}
      </div>
    </Tag>
  )
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.string,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Button
