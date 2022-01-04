import React from "react"

import logoStyle from "./Logo.module.scss"

const Logo = () => {
  return (
    <div className={logoStyle.logo}>
      {/* <h1>Purple World</h1> */}
      <img src="assets/images/logo/logo-static.png" />
    </div>
  )
}

export default Logo
