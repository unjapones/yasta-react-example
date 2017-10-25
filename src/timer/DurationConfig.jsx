import React from 'react';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

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
    this.updateDuration = this.updateDuration.bind(this);
  }

  updateDuration(evt) {
    let { hoursField, minsField, secsField } = this.state;

    const fieldDuration = Number.parseInt(evt.target.value, 10);
    switch (evt.target.name) {
      case 'hours':
        this.setState({ hoursField: fieldDuration });
        hoursField = fieldDuration;
        break;
      case 'mins':
        this.setState({ minsField: fieldDuration });
        minsField = fieldDuration;
        break;
      default:
        this.setState({ secsField: fieldDuration });
        secsField = fieldDuration;
    }

    const duration = (hoursField * 3600) + (minsField * 60) + secsField;
    this.props.onDurationChange(duration);
  }

  render() {
    return (
      <div>
        <input
          name="hours"
          type="number"
          value={this.state.hoursField}
          onChange={this.updateDuration}
          min="0"
          step="1"
        />
        :
        <input
          name="mins"
          type="number"
          value={this.state.minsField}
          onChange={this.updateDuration}
          min="0"
          max="59"
          step="1"
        />
        :
        <input
          name="secs"
          type="number"
          value={this.state.secsField}
          onChange={this.updateDuration}
          min="0"
          max="59"
          step="1"
        />
      </div>
    );
  }
}

export default DurationConfig;
