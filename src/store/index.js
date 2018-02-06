import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from './reducer.js';

const initialState = {};

export default createStore(reducer, initialState, devToolsEnhancer());
