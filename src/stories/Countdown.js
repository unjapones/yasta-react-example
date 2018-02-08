import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react';

import Countdown from '../components/presentation/Countdown';

const stories = storiesOf('Countdown', module);

stories.addDecorator(withKnobs);

stories.add('ticking', () => {
  return (
    <Countdown
      remainingTime={number('remainingTime (in ms)', 30000)}
      isTicking={boolean('isTicking', true)}
      onClick={action('clicked')}
    />
  );
});

stories.add('no ticking', () => {
  return (
    <Countdown
      remainingTime={9999}
      isTicking={false}
      onClick={action('clicked')}
    />
  );
});

