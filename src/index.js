import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import './index.css';
import TimerContainerRedux from './components/containers/Timer';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <TimerContainerRedux />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
