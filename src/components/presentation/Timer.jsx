import React from 'react';
import PropTypes from 'prop-types';

import { Progressbar } from './Progressbar';
import { Countdown } from './Countdown';
import { StartReset } from './StartReset';
import DurationConfigContainer from '../containers/DurationConfig';

import './Timer.css';

const CLASSNAME_BASE = 'timer';

export function Timer(props) {
  const {
    isTicking,
    duration,
    remainingTime,
    isDurationConfigured,
    setNewDuration,
    start,
    pause,
    resume,
    reset,
  } = props;

  const countdownComponent =
    (
      <Countdown isTicking={isTicking}
        remainingTime={remainingTime}
        onClick={isTicking ? pause : resume}
      />
    );
  const durationConfigComponent =
    (
      <DurationConfigContainer duration={duration} onDurationChange={setNewDuration} />
    );

  return (
    <div className={CLASSNAME_BASE}>
      <Progressbar
        isTicking={isTicking}
        duration={duration}
        remainingTime={remainingTime}
      />
      { isDurationConfigured ? countdownComponent : durationConfigComponent }
      <StartReset
        isDurationConfigured={isDurationConfigured}
        onStart={start}
        onReset={reset}
      />
    </div>
  );
}

Timer.propTypes = {
  // Indicates if the timer is ticking
  isTicking: PropTypes.bool.isRequired,
  // Duration (in [ms]) of the timer
  duration: PropTypes.number.isRequired,
  // Remaining time (in [ms]) of the timer
  remainingTime: PropTypes.number.isRequired,
  // Indicates if the timer's duration has been configured
  isDurationConfigured: PropTypes.bool.isRequired,
  // Callback to invoke with the new duration (in [ms] that has been picked.
  setNewDuration: PropTypes.func.isRequired,
  // Callback to invoke on start
  start: PropTypes.func.isRequired,
  // Callback to invoke on pause
  pause: PropTypes.func.isRequired,
  // Callback to invoke on resume
  resume: PropTypes.func.isRequired,
  // Callback to invoke on reset
  reset: PropTypes.func.isRequired,
};

