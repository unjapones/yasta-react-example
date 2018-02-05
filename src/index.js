import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import './index.css';
import TimerContainer from './components/containers/Timer';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <TimerContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
