import React from 'react';

import { Progressbar } from './Progressbar';
import { Countdown } from './Countdown';
import { StartReset } from './StartReset';
import DurationConfig from '../containers/DurationConfig';

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
      <DurationConfig duration={duration} onDurationChange={setNewDuration} />
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

// @TODO: define props type, requirement, etc

