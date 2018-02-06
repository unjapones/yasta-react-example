import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TimePicker from 'rc-time-picker';

import './DurationConfig.css';

const CLASSNAME_BASE = 'setup';
const CLASSNAME_INPUT_CONTAINER = 'input-container';
const CLASSNAME_OPEN_TIMEPICKER_POPUP = 'open-time-picker';
const CLASSNAME_TIMEPICKER = 'time-picker';
const CLASSNAME_TIMEPICKER_POPUP = 'time-picker-popup';
const CLASSNAME_TIMEPICKER_POPUP_DONE = 'time-picker-popup-done';

export function DurationConfig(props) {
  function renderAddon() {
    return (
      <div>
        <button
          type="button"
          onClick={props.onToggleShow}
          className={CLASSNAME_TIMEPICKER_POPUP_DONE}
        >
          <span role="img" aria-label="Ok">🆗</span>
        </button>
      </div>
    );
  }

  function renderOpenTimePickerButton(props) {
    return (
      <button
        type="button"
        onClick={props.onToggleShow}
        className={CLASSNAME_OPEN_TIMEPICKER_POPUP}
      >
        { props.momentForDuration.format('HH:mm:ss') }
      </button>
    );
  }

  const { momentForDuration, show } = props;

  return (
    <div className={CLASSNAME_BASE}>
      { show ? null : renderOpenTimePickerButton(props) }
      <div className={cx(CLASSNAME_BASE, CLASSNAME_INPUT_CONTAINER)}>
        <TimePicker
          value={momentForDuration}
          onChange={props.onChange}
          allowEmpty={false}
          addon={renderAddon}
          open={show}
          className={CLASSNAME_TIMEPICKER}
          popupClassName={CLASSNAME_TIMEPICKER_POPUP}
        />
      </div>
    </div>
  );
}

DurationConfig.propTypes = {
  // a moment() object: needed by the TimePicker and to output it formatted
  momentForDuration: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
};

export default DurationConfig;
