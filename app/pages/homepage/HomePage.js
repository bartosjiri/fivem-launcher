import React, {Fragment} from 'react';

import PageLayout from "../../components/page-layout/PageLayout"

import Background from "../../components/background/Background"
import Hero from "../../components/hero/Hero"
import Sidebar from "../../components/sidebar/Sidebar"

const HomePage = () => {
  return (
    <Fragment>
      <PageLayout
        primary={<Hero/>}
        secondary={<Sidebar/>}
      />
      {/* <Background/> */}
    </Fragment>

  )
}

export default HomePage
