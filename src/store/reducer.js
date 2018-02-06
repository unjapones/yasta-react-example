import { combineReducers } from 'redux';

import { timerReducer } from './Timer/reducers';

export default combineReducers({
  timer: timerReducer
});
