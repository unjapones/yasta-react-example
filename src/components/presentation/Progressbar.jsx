import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CircularProgressbar from 'react-circular-progressbar';
import './Progressbar.css';

const CLASSNAME_BASE = 'progressbar';

export function Progressbar(props) {
  const { isTicking, remainingTime, duration } = props;
  const percentage = remainingTime / duration * 100;

  const statusClassName = cx({
    paused: remainingTime > 0 && !isTicking,
    done: remainingTime === 0
  });

  return (
    <div className={CLASSNAME_BASE}>
      <CircularProgressbar
        className={statusClassName}
        textForPercentage={null}
        percentage={percentage}
        background={remainingTime === 0}
        strokeWidth={2}
      />
    </div>
  );
}

Progressbar.propTypes = {
  duration: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  isTicking: PropTypes.bool.isRequired
};

export default Progressbar;
