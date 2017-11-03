import React from 'react';
import moment from 'moment';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

const CLASSNAME_BASE = 'setup';

/**
 * Configures the timer's duration, given an amount of hours, mins and secs.
 * Properties:
 * - duration: number, in seconds
 * - onDurationChange: function callback
 */
class DurationConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secsField: getSecsFieldFromDuration(props.duration),
      minsField: getMinsFieldFromDuration(props.duration),
      hoursField: getHoursFieldFromDuration(props.duration),
    };
    this.updateHours = this.updateHours.bind(this);
    this.updateMins = this.updateMins.bind(this);
    this.updateSecs = this.updateSecs.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
  }

  updateHours(time) {
    const { minsField, secsField } = this.state;
    const hoursField = time.hour();
    this.setState({ hoursField });
    this.updateDuration(hoursField, minsField, secsField);
  }

  updateMins(time) {
    const { hoursField, secsField } = this.state;
    const minsField = time.minute();
    this.setState({ minsField });
    this.updateDuration(hoursField, minsField, secsField);
  }

  updateSecs(time) {
    const { hoursField, minsField } = this.state;
    const secsField = time.second();
    this.setState({ secsField });
    this.updateDuration(hoursField, minsField, secsField);
  }

  updateDuration(hoursField, minsField, secsField) {
    const duration = (hoursField * 3600) + (minsField * 60) + secsField;
    this.props.onDurationChange(duration);
  }

  render() {
    const { hoursField, minsField, secsField } = this.state;

    return (
      <div className={CLASSNAME_BASE}>
        <TimePicker
          value={moment().hour(hoursField)}
          showMinute={false}
          showSecond={false}
          onChange={this.updateHours}
        />
        <TimePicker
          value={moment().minute(minsField)}
          showHour={false}
          showSecond={false}
          onChange={this.updateMins}
        />
        <TimePicker
          value={moment().second(secsField)}
          showHour={false}
          showMinute={false}
          onChange={this.updateSecs}
        />
      </div>
    );
  }
}

export default DurationConfig;
