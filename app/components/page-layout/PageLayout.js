import React from "react"
import PropTypes from "prop-types"

import pageLayoutStyle from "./PageLayout.module.scss"

const PageLayout = ({primary, secondary}) => {
  return (
    <div className={pageLayoutStyle.layout}>
      <div className={pageLayoutStyle.primary}>
        {primary}
      </div>
      {secondary && (
        <div className={pageLayoutStyle.secondary}>
          {secondary}
        </div>
      )}
    </div>
  )
}

PageLayout.propTypes = {
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node
}

export default PageLayout
