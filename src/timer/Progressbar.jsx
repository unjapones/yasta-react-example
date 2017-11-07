import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CircularProgressbar from 'react-circular-progressbar';
import './Progressbar.css';

const CLASSNAME_BASE = 'countdown';

export function Progressbar(props) {
  const { isTicking, remainingTime, duration } = props;
  const percentage = 100 - Math.floor((remainingTime / duration) * 100);

  const className = cx({
    [CLASSNAME_BASE]: true,
    paused: remainingTime > 0 && !isTicking,
    done: remainingTime === 0,
  });

  return (
    <CircularProgressbar
      textForPercentage={() => ''}
      percentage={percentage}
      className={className}
      background={remainingTime === 0}
      strokeWidth={2}
    />
  );
}

Progressbar.propTypes = {
  duration: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  isTicking: PropTypes.bool.isRequired,
};

export default Progressbar;
