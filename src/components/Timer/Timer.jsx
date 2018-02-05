import React from 'react';
import { connect } from 'react-redux';

import {
  setNewDuration,
  start,
  pause,
  resume,
  reset,
  tick
} from '../../store/Timer/actions';

import { Progressbar } from './Progressbar';
import { Countdown } from './Countdown';
import { StartReset } from './StartReset';
import DurationConfig from './DurationConfig';

import './Timer.css';

const INTERVAL_STEP = 1000; // in [ms]
const CLASSNAME_BASE = 'timer';

const mapDispatchToProps = dispatch => {
  return {
    setNewDuration: (duration) => { dispatch(setNewDuration(duration)); },
    start: (intervalId) => { dispatch(start(intervalId)); },
    pause: () => { dispatch(pause()); },
    resume: (intervalId) => { dispatch(resume(intervalId)); },
    reset: () => { dispatch(reset()); },
    tick: () => { dispatch(tick()); },
  }
};

const mapStateToProps = state => {
  let { timer } = state;
  return {
    duration: timer.duration,
    remainingTime: timer.remainingTime,
    isTicking: timer.isTicking,
    isDurationConfigured: timer.isDurationConfigured,
    intervalId: timer.intervalId,
  };
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.createCountDown = this.createCountDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  createCountDown() {
    return setInterval(
      () => {
        let { remainingTime, intervalId, pause, tick } = this.props;
        if (remainingTime === 0) {
          clearInterval(intervalId);
          pause();
        } else {
          tick();
        }
      },
      INTERVAL_STEP,
    );
  }

  startTimer() {
    this.props.start(this.createCountDown())
  }
  pauseTimer() {
    clearInterval(this.props.intervalId);
    this.props.pause();
  }
  resumeTimer() {
    this.props.resume(this.createCountDown())
  }
  resetTimer() {
    clearInterval(this.props.intervalId);
    this.props.reset();
  }

  render() {
    const {
      isTicking,
      duration,
      remainingTime,
      isDurationConfigured,
      setNewDuration,
    } = this.props;

    const countdownComponent =
      (
        <Countdown isTicking={isTicking}
          remainingTime={remainingTime}
          onClick={isTicking ? this.pauseTimer : this.resumeTimer}
        />
      );
    const durationConfigComponent =
      (
        <DurationConfig duration={duration} onDurationChange={setNewDuration} />
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
          onStart={this.startTimer}
          onReset={this.resetTimer}
        />
      </div>
    );
  }
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;
