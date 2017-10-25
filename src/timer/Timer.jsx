import React from 'react';

import Countdown from './Countdown';
import DurationConfig from './DurationConfig';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 4, // In seconds
      started: false,
      timeoutId: null
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
    const timeoutId = setTimeout(
      () => {
        window.alert('Ding!');
        this.setState({ started: false });
      },
      this.state.duration * 1000,
    );
    this.setState({
      timeoutId,
      started: true,
    });
  }

  cancel() {
    clearTimeout(this.state.timeoutId);
    this.setState({
      timeoutId: null,
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
        <Countdown duration={this.state.duration} />
        <button typ="button" onClick={this.cancel}>Cancel</button>
      </p>
    );
  }

  render() {
    return this.state.started ? this.renderStarted() : this.renderDefault();
  }
}

export default Timer;
