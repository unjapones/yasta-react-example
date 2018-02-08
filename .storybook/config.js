import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/Countdown.js');
  require('../src/stories/DurationConfig.js');
}

configure(loadStories, module);

