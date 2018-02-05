const DEFAULT_DURATION = 4000; // in [ms]

const defaultState = {
  duration: DEFAULT_DURATION,
  remainingTime: DEFAULT_DURATION,
  isTicking: false,
  isDurationConfigured: false,
  intervalId: null
};

export function timerReducer(state = defaultState, action) {
  switch(action.type) {

  case 'SET_NEW_DURATION':
    return Object.assign({}, state, {
      duration: action.payload.duration,
      remainingTime: action.payload.duration,
    });

  case 'START':
    return Object.assign({}, state, {
      isDurationConfigured: true,
      isTicking: true,
      remainingTime: state.duration,
      intervalId: action.payload.intervalId,
    });

  case 'PAUSE':
    return Object.assign({}, state, {
      isTicking: false,
      intervalId: null,
    });

  case 'RESUME':
    return Object.assign({}, state, {
      isTicking: true,
      intervalId: action.payload.intervalId,
    });

  case 'RESET':
    return Object.assign({}, state, {
      isDurationConfigured: false,
      isTicking: false,
      intervalId: null,
      remainingTime: state.duration
    });

  case 'TICK':
    return Object.assign({}, state, {
      remainingTime: state.remainingTime - action.payload.step,
    });

  default:
    return state;
  }
}

