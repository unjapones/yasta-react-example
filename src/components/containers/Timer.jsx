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

import { Timer } from '../presentation/Timer';

const INTERVAL_STEP = 1000; // in [ms]

const mapDispatchToProps = dispatch => {
  return {
    setNewDuration: duration => {
      dispatch(setNewDuration(duration));
    },
    start: intervalId => {
      dispatch(start(intervalId));
    },
    pause: () => {
      dispatch(pause());
    },
    resume: intervalId => {
      dispatch(resume(intervalId));
    },
    reset: () => {
      dispatch(reset());
    },
    tick: () => {
      dispatch(tick());
    }
  };
};

const mapStateToProps = state => {
  let { timer } = state;
  return {
    duration: timer.duration,
    remainingTime: timer.remainingTime,
    isTicking: timer.isTicking,
    isDurationConfigured: timer.isDurationConfigured,
    intervalId: timer.intervalId
  };
};

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createCountDown = this.createCountDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  createCountDown() {
    return setInterval(() => {
      let { remainingTime, intervalId, pause, tick } = this.props;
      if (remainingTime === 0) {
        clearInterval(intervalId);
        pause();
      } else {
        tick();
      }
    }, INTERVAL_STEP);
  }

  startTimer() {
    this.props.start(this.createCountDown());
  }
  pauseTimer() {
    clearInterval(this.props.intervalId);
    this.props.pause();
  }
  resumeTimer() {
    this.props.resume(this.createCountDown());
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
      setNewDuration
    } = this.props;

    return (
      <Timer
        isTicking={isTicking}
        duration={duration}
        remainingTime={remainingTime}
        isDurationConfigured={isDurationConfigured}
        setNewDuration={setNewDuration}
        start={this.startTimer}
        pause={this.pauseTimer}
        resume={this.resumeTimer}
        reset={this.resetTimer}
      />
    );
  }
}

const TimerContainerRedux = connect(mapStateToProps, mapDispatchToProps)(
  TimerContainer
);

export default TimerContainerRedux;
