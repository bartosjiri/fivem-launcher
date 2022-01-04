import React from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Layout from "../layout/Layout"
import HomePage from "./homepage/HomePage"

const Router = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage}/>
      </Switch>
    </Layout>
  )
}

export default Router
