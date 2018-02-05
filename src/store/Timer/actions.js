const INTERVAL_STEP = 1000; // in [ms]

export function setNewDuration(duration) {
  return {
    type: 'SET_NEW_DURATION',
    payload: {
      duration: duration,
    },
  };
}

export function start(intervalId) {
  return {
    type: 'START',
    payload: {
      intervalId,
    },
  };
}

export function pause() {
  return {
    type: 'PAUSE',
  };
}

export function resume(intervalId) {
  return {
    type: 'RESUME',
    payload: {
      intervalId,
    },
  };
}

export function reset() {
  return {
    type: 'RESET',
  };
}

export function tick(step = INTERVAL_STEP) {
  return {
    type: 'TICK',
    payload: {
      step,
    },
  };
}

