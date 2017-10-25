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
      paused: false,
      started: false,
      intervalId: null,
    };

    this.start = this.start.bind(this);
    this.setNewDuration = this.setNewDuration.bind(this);
    this.createCountDown = this.createCountDown.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderStarted = this.renderStarted.bind(this);
  }

  setNewDuration(duration) {
    this.setState({ duration: duration || 0 });
  }

  createCountDown() {
    return setInterval(
      () => {
        if (this.state.remainingTime === 1) {
          clearInterval(this.state.intervalId);
          window.alert('Ding!');
          this.setState({ started: false });
        } else {
          this.setState({ remainingTime: this.state.remainingTime - 1 });
        }
      },
      1000,
    );
  }

  start() {
    this.setState({
      intervalId: this.createCountDown(),
      remainingTime: this.state.duration,
      started: true,
    });
  }

  pause() {
    clearInterval(this.state.intervalId);
    this.setState({
      paused: true,
      intervalId: null,
    });
  }

  resume() {
    this.setState({
      intervalId: this.createCountDown(),
      paused: false,
    });
  }

  cancel() {
    clearInterval(this.state.intervalId);
    this.setState({
      started: false,
      paused: false,
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
          onClick={this.start}
          disabled={duration <= 0}
        >
          Start
        </button>
      </div>
    );
  }

  renderStarted() {
    const playPauseButton = this.state.paused ?
      (<button type="button" onClick={this.resume}>Resume</button>) :
      (<button type="button" onClick={this.pause}>Pause</button>);

    return (
      <p>
        <Countdown remainingTime={this.state.remainingTime} />
        {playPauseButton}
        <button type="button" onClick={this.cancel}>Cancel</button>
      </p>
    );
  }

  render() {
    return this.state.started ? this.renderStarted() : this.renderDefault();
  }
}

export default Timer;
