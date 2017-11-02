import React from 'react';
import cx from 'classnames';

import Countdown from './Countdown';
import DurationConfig from './DurationConfig';

import './Timer.css';

const DEFAULT_DURATION = 4; // Seconds
const CLASSNAME_BASE = 'timer';
const CLASSNAME_SETUP = 'setup';
const CLASSNAME_COUNTDOWN = 'countdown';
const CLASSNAME_BUTTON_TOGGLE_PAUSE = 'toggle-pause';
const CLASSNAME_BUTTON_RESET = 'reset';
const CLASSNAME_BUTTON_START = 'start';

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
      <div className={cx(CLASSNAME_BASE, CLASSNAME_SETUP)}>
        <DurationConfig
          duration={duration}
          onDurationChange={this.setNewDuration}
        />
        <button
          type="button"
          className={CLASSNAME_BUTTON_START}
          onClick={this.start}
          disabled={duration <= 0}
        >
          Start
        </button>
      </div>
    );
  }

  renderStarted() {
    const pauseResumeButton = (
      <button
        type="button"
        className={CLASSNAME_BUTTON_TOGGLE_PAUSE}
        onClick={this.state.isTicking ? this.pause : this.resume}
        disabled={this.state.remainingTime === 0}
      >
        { this.isTicking ? 'Pause' : 'Resume' }
      </button>
    );
    const resetButton = (
      <button
        type="button"
        className={CLASSNAME_BUTTON_RESET}
        onClick={this.reset}
      >
        Reset
      </button>
    );

    return (
      <div className={cx(CLASSNAME_BASE, CLASSNAME_COUNTDOWN)}>
        <Countdown
          isTicking={this.state.isTicking}
          duration={this.state.duration}
          remainingTime={this.state.remainingTime}
        />
        { pauseResumeButton }
        { resetButton }
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
