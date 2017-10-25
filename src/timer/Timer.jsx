import React from 'react';

import Countdown from './Countdown';
import DurationConfig from './DurationConfig';

const DEFAULT_DURATION = 4; // Seconds

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: DEFAULT_DURATION,
      remainingTime: DEFAULT_DURATION,
      started: false,
      intervalId: null,
    };

    this.startTimer = this.startTimer.bind(this);
    this.setNewDuration = this.setNewDuration.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderStarted = this.renderStarted.bind(this);
  }

  setNewDuration(duration) {
    this.setState({ duration: duration || 0 });
  }

  startTimer() {
    const intervalId = setInterval(
      () => {
        if (this.state.remainingTime === 0) {
          clearInterval(this.state.intervalId);
          window.alert('Ding!');
          this.setState({ started: false });
        } else {
          this.setState({ remainingTime: this.state.remainingTime - 1 });
        }
      },
      1000,
    );

    this.setState({
      intervalId,
      remainingTime: this.state.duration,
      started: true,
    });
  }

  cancel() {
    clearInterval(this.state.intervalId);
    this.setState({
      started: false,
    });
  }

  renderDefault() {
    const { duration } = this.state;
    return (
      <div className="timer">
        <DurationConfig
          duration={duration}
          onDurationChange={this.setNewDuration}
        />
        <button
          type="button"
          onClick={this.startTimer}
          disabled={duration <= 0}
        >
          Start
        </button>
      </div>
    );
  }

  renderStarted() {
    return (
      <p>
        <Countdown remainingTime={this.state.remainingTime} />
        <button typ="button" onClick={this.cancel}>Cancel</button>
      </p>
    );
  }

  render() {
    return this.state.started ? this.renderStarted() : this.renderDefault();
  }
}

export default Timer;
