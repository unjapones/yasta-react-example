import React from 'react';

/**
 * Configures the timer's duration.
 * Properties:
 * - duration: number, in seconds
 * - onDurationChange: function callback
 */
class DurationConfig extends React.Component {
  constructor(props) {
    super(props);
    this.renderDurationInput = this.renderDurationInput.bind(this);
  }

  renderDurationInput() {
    return (
      <input
        type="number"
        value={this.props.duration}
        onChange={this.props.onDurationChange}
      />
    );
  }

  render() {
    return (
      <div>
        Duration: {this.renderDurationInput()} seconds
      </div>
    );
  }
}

export default DurationConfig;
