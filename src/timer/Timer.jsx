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
      isTicking: false,
      isDurationConfigured: false,
      intervalId: null,
    };

    this.start = this.start.bind(this);
    this.setNewDuration = this.setNewDuration.bind(this);
    this.createCountDown = this.createCountDown.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.reset = this.reset.bind(this);
    this.renderDurationConfig = this.renderDurationConfig.bind(this);
    this.renderStarted = this.renderStarted.bind(this);
  }

  setNewDuration(duration) {
    this.setState({ duration: duration || 0 });
  }

  createCountDown() {
    return setInterval(
      () => {
        if (this.state.remainingTime === 0) {
          clearInterval(this.state.intervalId);
          this.setState({ isTicking: false });
        } else {
          this.setState({ remainingTime: this.state.remainingTime - 1 });
        }
      },
      1000,
    );
  }

  start() {
    this.setState({
      isDurationConfigured: true,
      isTicking: true,
      intervalId: this.createCountDown(),
      remainingTime: this.state.duration,
    });
  }

  pause() {
    clearInterval(this.state.intervalId);
    this.setState({
      isTicking: false,
      intervalId: null,
    });
  }

  resume() {
    this.setState({
      isTicking: true,
      intervalId: this.createCountDown(),
    });
  }

  reset() {
    clearInterval(this.state.intervalId);
    this.setState({
      isDurationConfigured: false,
      isTicking: false,
      intervalId: null,
    });
  }

  renderDurationConfig() {
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
    const playPauseButton = this.state.isTicking ?
      (<button type="button" onClick={this.resume}>Resume</button>) :
      (<button type="button" onClick={this.pause}>Pause</button>);

    return (
      <div>
        <Countdown
          isTicking={this.state.isTicking}
          duration={this.state.duration}
          remainingTime={this.state.remainingTime}
        />
        { this.state.remainingTime > 0 ? playPauseButton : null }
        <button type="button" onClick={this.reset}>Reset</button>
      </div>
    );
  }

  render() {
    return this.state.isDurationConfigured ?
      this.renderStarted() :
      this.renderDurationConfig();
  }
}

export default Timer;
