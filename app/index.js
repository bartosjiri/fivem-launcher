import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';
import Root from './utils/containers/Root';
import {configureStore, history} from './store/configureStore';

import "./styles/reset.scss"
import "./styles/fonts.scss"
import "./styles/general.scss"

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
