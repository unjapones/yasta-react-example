import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CircularProgressbar from 'react-circular-progressbar';
import './Countdown.css';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

const CLASSNAME_BASE = 'countdown';

/**
 * Countdown that displays time left in seconds.
 */
export function Countdown(props) {
  const { isTicking, remainingTime, duration } = props;

  const hours = getHoursFieldFromDuration(remainingTime);
  const mins = getMinsFieldFromDuration(remainingTime);
  const secs = getSecsFieldFromDuration(remainingTime);

  const hoursPadded = hours < 10 ? `0${hours}` : hours;
  const minsPadded = mins < 10 ? `0${mins}` : mins;
  const secsPadded = secs < 10 ? `0${secs}` : secs;
  const timeLeftString = `${hoursPadded}:${minsPadded}:${secsPadded}`;

  const percentage = 100 - Math.floor((remainingTime / duration) * 100);

  const className = cx({
    [CLASSNAME_BASE]: true,
    paused: remainingTime > 0 && !isTicking,
    done: remainingTime === 0,
  });

  return (
    <CircularProgressbar
      textForPercentage={() => timeLeftString}
      percentage={percentage}
      className={className}
      background={remainingTime === 0}
      strokeWidth={2}
    />
  );
}

Countdown.propTypes = {
  duration: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  isTicking: PropTypes.bool.isRequired,
};

export default Countdown;
