import React from 'react';

import Countdown from './Countdown';
import DurationConfig from './DurationConfig';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 4, // In seconds
      started: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderStarted = this.renderStarted.bind(this);
    this.setNewDuration = this.setNewDuration.bind(this);
  }

  setNewDuration(evt) {
    this.setState({ duration: evt.target.value || 0 });
  }

  startTimer() {
    this.setState({ started: true });
    setTimeout(
      () => {
        window.alert('Ding!');
        this.setState({ started: false });
      },
      this.state.duration * 1000,
    );
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
      </p>
    );
  }

  render() {
    return this.state.started ? this.renderStarted() : this.renderDefault();
  }
}

export default Timer;
