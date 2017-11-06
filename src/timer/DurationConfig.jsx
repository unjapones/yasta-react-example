import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';
import './DurationConfig.css';

const CLASSNAME_BASE = 'setup';
const CLASSNAME_INPUT_CONTAINER = 'input-container';
const CLASSNAME_OPEN_TIMEPICKER_POPUP = 'open-time-picker';
const CLASSNAME_TIMEPICKER = 'time-picker';
const CLASSNAME_TIMEPICKER_POPUP = 'time-picker-popup';
const CLASSNAME_TIMEPICKER_POPUP_DONE = 'time-picker-popup-done';

/**
 * Configures the timer's duration, given an amount of hours, mins and secs.
 * Properties:
 * - duration: number, in seconds
 * - onDurationChange: function callback
 */
class DurationConfig extends React.Component {
  constructor(props) {
    super(props);
    const hoursField = getHoursFieldFromDuration(props.duration);
    const minsField = getMinsFieldFromDuration(props.duration);
    const secsField = getSecsFieldFromDuration(props.duration);
    const momentForDuration = moment();
    momentForDuration.hour(hoursField);
    momentForDuration.minute(minsField);
    momentForDuration.second(secsField);

    this.state = {
      momentForDuration,
      showTimePicker: false,
    };

    this.updateDuration = this.updateDuration.bind(this);
    this.toggleShowTimePicker = this.toggleShowTimePicker.bind(this);
    this.renderAddon = this.renderAddon.bind(this);
    this.renderOpenTimePickerButton = this.renderOpenTimePickerButton.bind(this);
  }

  updateDuration(time) {
    this.setState({ momentForDuration: time });
    const hours = time.hour();
    const mins = time.minutes();
    const secs = time.second();
    const duration = (hours * 3600) + (mins * 60) + secs;
    this.props.onDurationChange(duration);
  }

  toggleShowTimePicker() {
    this.setState({ showTimePicker: !this.state.showTimePicker });
  }

  renderAddon() {
    return (
      <div>
        <button
          type="button"
          onClick={this.toggleShowTimePicker}
          className={CLASSNAME_TIMEPICKER_POPUP_DONE}
        >
          Done
        </button>
      </div>
    );
  }

  renderOpenTimePickerButton() {
    return (
      <button
        type="button"
        onClick={this.toggleShowTimePicker}
        className={CLASSNAME_OPEN_TIMEPICKER_POPUP}
      >
        { this.state.momentForDuration.format('HH:mm:ss') }
      </button>
    );
  }

  render() {
    const { momentForDuration, showTimePicker } = this.state;

    return (
      <div className={CLASSNAME_BASE}>
        { showTimePicker ? null : this.renderOpenTimePickerButton() }
        <div className={cx(CLASSNAME_BASE, CLASSNAME_INPUT_CONTAINER)}>
          <TimePicker
            value={momentForDuration}
            onChange={this.updateDuration}
            allowEmpty={false}
            addon={this.renderAddon}
            open={showTimePicker}
            className={CLASSNAME_TIMEPICKER}
            popupClassName={CLASSNAME_TIMEPICKER_POPUP}
          />
        </div>
      </div>
    );
  }
}

export default DurationConfig;
