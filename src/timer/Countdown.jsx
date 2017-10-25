import React from 'react';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

/**
 * Countdown that displays time left in seconds.
 */
export function Countdown(props) {
  const timeLeft = props.remainingTime;
  const hours = getHoursFieldFromDuration(timeLeft);
  const mins = getMinsFieldFromDuration(timeLeft);
  const secs = getSecsFieldFromDuration(timeLeft);

  const minsPadded = mins < 10 ? `0${mins}` : mins;
  const secsPadded = secs < 10 ? `0${secs}` : secs;
  return (
    <span>Time left: {hours}:{minsPadded}:{secsPadded}</span>
  );
}

export default Countdown;
