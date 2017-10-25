import React from 'react';

import CircularProgressbar from 'react-circular-progressbar';
import './Countdown.css';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

/**
 * Countdown that displays time left in seconds.
 */
export function Countdown(props) {
  const { remainingTime, duration } = props;

  const hours = getHoursFieldFromDuration(remainingTime);
  const mins = getMinsFieldFromDuration(remainingTime);
  const secs = getSecsFieldFromDuration(remainingTime);

  const minsPadded = mins < 10 ? `0${mins}` : mins;
  const secsPadded = secs < 10 ? `0${secs}` : secs;
  const timeLeftString = `${hours}:${minsPadded}:${secsPadded}`;

  const percentage = 100 - Math.floor((remainingTime / duration) * 100);

  return (
    <CircularProgressbar
      textForPercentage={() => timeLeftString}
      percentage={percentage}
    />
  );
}

export default Countdown;
