import React from 'react';
import moment from 'moment';

import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, boolean, object } from '@storybook/addon-knobs/react';
import { withNotes } from '@storybook/addon-notes';

import DurationConfig from '../components/presentation/DurationConfig';

function defaultDurationConfigStory() {
  const durationObject = object('durationObject', {
    hour: 0,
    minute: 1,
    second: 10
  });
  const momentForDuration = moment();
  momentForDuration.hour(durationObject.hour);
  momentForDuration.minute(durationObject.minute);
  momentForDuration.second(durationObject.second);

  const updateMomentForDuration = moment => {
    durationObject.hour = moment.hours();
    durationObject.minute = moment.minutes();
    durationObject.second = moment.seconds();
    momentForDuration.hour(moment.hours());
    momentForDuration.minute(moment.minutes());
    momentForDuration.second(moment.seconds());
  };
  // Decorated onChange that updates the knob, the moment() object and lobs the action
  const updateMomentForDurationDecorated = decorateAction([
    args => {
      updateMomentForDuration(args[0]);
      return args;
    }
  ]);

  return (
    <DurationConfig
      momentForDuration={momentForDuration}
      onChange={updateMomentForDurationDecorated('onChange')}
      show={boolean('show', true)}
      onToggleShow={action('onToggleShow')}
    />
  );
}

const notes = `
The knobs do not match the properties, they are there to play around with the component.

onToggleShow: is a callback that is supposed to toggle 'show'.
onChange: is a callback that is called everytime something is selected in the time picker.
`;
const defaultDurationConfigStoryWithNotes = withNotes(notes)(
  defaultDurationConfigStory
);

const stories = storiesOf('DurationConfig', module);
stories.addDecorator(withKnobs);
stories.add('default', defaultDurationConfigStoryWithNotes);

