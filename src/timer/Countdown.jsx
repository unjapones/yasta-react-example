import React from 'react';

import {
  getSecsFieldFromDuration,
  getMinsFieldFromDuration,
  getHoursFieldFromDuration,
} from './durationHelpers';

/**
 * Countdown that displays time left in seconds.
 * Properties:
 * - duration: number, in seconds.
 */
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.duration,
      intervalId: null,
    };
    this.startCountDown = this.startCountDown.bind(this);
  }

  componentDidMount() {
    this.startCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  startCountDown() {
    const interval = 1000;
    let iteration = 1;

    const intervalId = setInterval(
      () => {
        const timeLeft = this.props.duration - iteration;
        if (timeLeft > 0) {
          this.setState({ timeLeft });
          iteration += 1;
        } else {
          this.setState({ timeLeft: 0 });
          clearInterval(intervalId);
        }
      },
      interval,
    );

    // Store the interval id to clear it on unmount
    this.setState({ intervalId });
  }

  render() {
    const { timeLeft } = this.state;
    const hours = getHoursFieldFromDuration(timeLeft);
    const mins = getMinsFieldFromDuration(timeLeft);
    const secs = getSecsFieldFromDuration(timeLeft);

    const minsPadded = mins < 10 ? `0${mins}` : mins;
    const secsPadded = secs < 10 ? `0${secs}` : secs;
    return (
      <span>Time left: {hours}:{minsPadded}:{secsPadded}</span>
    );
  }
}

export default Countdown;
