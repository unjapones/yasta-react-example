import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Countdown.css';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration
} from '../../common/durationHelpers';

const CLASSNAME_BASE = 'countdown';

export function Countdown(props) {
  const { isTicking, onClick } = props;
  const remainingTime = Math.floor(props.remainingTime / 1000);

  const hours = getHoursFieldFromDuration(remainingTime);
  const mins = getMinsFieldFromDuration(remainingTime);
  const secs = getSecsFieldFromDuration(remainingTime);

  const hoursPadded = hours < 10 ? `0${hours}` : hours;
  const minsPadded = mins < 10 ? `0${mins}` : mins;
  const secsPadded = secs < 10 ? `0${secs}` : secs;
  const timeLeftString = `${hoursPadded}:${minsPadded}:${secsPadded}`;

  const className = cx({
    [CLASSNAME_BASE]: true,
    paused: remainingTime > 0 && !isTicking,
    done: remainingTime === 0
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={remainingTime === 0}
    >
      {timeLeftString}
    </button>
  );
}

Countdown.propTypes = {
  remainingTime: PropTypes.number.isRequired,
  isTicking: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Countdown;
