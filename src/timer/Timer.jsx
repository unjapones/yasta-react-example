import React from 'react';

import { Progressbar } from './Progressbar';
import { Countdown } from './Countdown';
import { StartReset } from './StartReset';
import DurationConfig from './DurationConfig';

import './Timer.css';

const DEFAULT_DURATION = 4000; // in [ms]
const INTERVAL_STEP = 1000; // in [ms]
const CLASSNAME_BASE = 'timer';

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
  }

  setNewDuration(duration) {
    const newDuration = duration || 0;
    this.setState({
      duration: newDuration,
      remainingTime: newDuration,
    });
  }

  createCountDown() {
    return setInterval(
      () => {
        if (this.state.remainingTime === 0) {
          clearInterval(this.state.intervalId);
          this.setState({ isTicking: false });
        } else {
          this.setState({ remainingTime: this.state.remainingTime - INTERVAL_STEP });
        }
      },
      INTERVAL_STEP,
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
      remainingTime: this.state.duration,
    });
  }

  render() {
    const {
      isTicking,
      duration,
      remainingTime,
      isDurationConfigured,
    } = this.state;

    const countdownComponent =
      (
        <Countdown
          isTicking={isTicking}
          remainingTime={remainingTime}
          onClick={isTicking ? this.pause : this.resume}
        />
      );
    const durationConfigComponent =
    (
      <DurationConfig
        duration={duration}
        onDurationChange={this.setNewDuration}
      />
    );

    return (
      <div className={CLASSNAME_BASE}>
        <Progressbar
          isTicking={isTicking}
          duration={duration}
          remainingTime={remainingTime}
        />
        { isDurationConfigured ? countdownComponent : durationConfigComponent }
        <StartReset
          isDurationConfigured={isDurationConfigured}
          onStart={this.start}
          onReset={this.reset}
        />
      </div>
    );
  }
}

export default Timer;
