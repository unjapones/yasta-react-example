import React from 'react';
import PropTypes from 'prop-types';

const CLASSNAME_BUTTON_RESET = 'reset';
const CLASSNAME_BUTTON_START = 'start';

export function StartReset(props) {
  const { isDurationConfigured, onStart, onReset } = props;
  const startButton = (
    <button
      type="button"
      className={CLASSNAME_BUTTON_START}
      onClick={onStart}
    >
      Start
    </button>
  );
  const resetButton = (
    <button
      type="button"
      className={CLASSNAME_BUTTON_RESET}
      onClick={onReset}
    >
      Reset
    </button>
  );

  return !isDurationConfigured ? startButton : resetButton;
}

StartReset.propTypes = {
  isDurationConfigured: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default StartReset;
