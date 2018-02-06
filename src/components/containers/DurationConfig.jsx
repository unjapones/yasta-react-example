import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from '../../common/durationHelpers';

import DurationConfig from '../presentation/DurationConfig';

class DurationConfigContainer extends React.Component {
  constructor(props) {
    super(props);
    const duration = Math.floor(props.duration / 1000);

    const hoursField = getHoursFieldFromDuration(duration);
    const minsField = getMinsFieldFromDuration(duration);
    const secsField = getSecsFieldFromDuration(duration);
    const momentForDuration = moment();
    momentForDuration.hour(hoursField);
    momentForDuration.minute(minsField);
    momentForDuration.second(secsField);

    this.state = {
      momentForDuration,
      show: false,
    };

    this.updateDuration = this.updateDuration.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  /**
   * Get the correponding duration from the the moment() in [ms] and invoke the
   * corresonding callback.
   */
  updateDuration(time) {
    this.setState({ momentForDuration: time });
    const hours = time.hour();
    const mins = time.minutes();
    const secs = time.second();
    const duration = (hours * 3600) + (mins * 60) + secs;
    // Multiply duration by 1000 to get it in [ms]
    this.props.onDurationChange(duration * 1000);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { momentForDuration, show } = this.state;

    return (
      <DurationConfig
        momentForDuration={momentForDuration}
        onChange={this.updateDuration}
        show={show}
        onToggleShow={this.toggleShow}
      />
    );
  }
}

DurationConfigContainer.propTypes = {
  // The current duration (in [ms])
  duration: PropTypes.number.isRequired,
  // Callback to invoke after a duration (in [ms] has been picked.
  onDurationChange: PropTypes.func.isRequired,
};

export default DurationConfigContainer;
