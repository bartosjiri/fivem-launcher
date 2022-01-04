import React from "react"
import PropTypes from "prop-types";

import Wrapper from "./wrapper/Wrapper"
import Header from "./header/Header"
import Preloader from "../components/preloader/Preloader"

import preloaderStyle from "../components/preloader/Preloader.module.scss"

const Layout = ({children}) => {
  const mainStyle = {
    display: "none"
  }

  return (
    <Wrapper>
      <Header/>
      <Preloader/>
      <main className={preloaderStyle.main_enable} style={mainStyle}>
        {children}
      </main>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
