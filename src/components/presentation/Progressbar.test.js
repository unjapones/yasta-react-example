import renderer from 'react-test-renderer';

import { Progressbar } from './Progressbar';

const DEFAULT_PROPS = {
  duration: 4000,
  remainingTime: 4000,
  isTicking: false
};

test('class in SVG changes when remainingTime is zero and isTicking is truthy', () => {
  const props = {
    ...DEFAULT_PROPS
  };

  let component = renderer.create(Progressbar(props));
  expect(component.toJSON()).toMatchSnapshot();

  props.remainingTime = 2000;
  props.isTicking = true;
  component = renderer.create(Progressbar(props));
  expect(component.toJSON()).toMatchSnapshot();
});

test('class in SVG changes when remainingTime is zero', () => {
  const props = {
    ...DEFAULT_PROPS
  };

  let component = renderer.create(Progressbar(props));
  expect(component.toJSON()).toMatchSnapshot();

  props.remainingTime = 0;
  component = renderer.create(Progressbar(props));
  expect(component.toJSON()).toMatchSnapshot();
});
