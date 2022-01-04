import React from "react"
import PropTypes from "prop-types"

import Background from "../../components/background/Background"

import wrapperStyle from "./Wrapper.module.scss"

const Wrapper = ({children}) => {
  return (
    <div className={wrapperStyle.wrapper}>
      {children}
      {/* <Background/> */}
    </div>
  )
}

export default Wrapper
