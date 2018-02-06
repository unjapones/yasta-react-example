import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StartReset } from './StartReset';

const DEFAULT_PROPS = {
  isDurationConfigured: false,
  onStart: () => {},
  onReset: () => {}
};

test('Button changes from Start to Reset after duration is configured', () => {
  const props = {
    ...DEFAULT_PROPS
  };

  let component = renderer.create(StartReset(props));
  expect(component.toJSON()).toMatchSnapshot();

  props.isDurationConfigured = true;
  component = renderer.create(StartReset(props));
  expect(component.toJSON()).toMatchSnapshot();
});

test('When duration is not configured, click trigger onStart', () => {
  const props = {
    ...DEFAULT_PROPS,
    onStart: jest.fn()
  };

  const component = shallow(StartReset(props));
  component.find('button').simulate('click');
  expect(props.onStart).toHaveBeenCalled();
});

test('When duration is configured, click trigger onReset', () => {
  const props = {
    ...DEFAULT_PROPS,
    isDurationConfigured: true,
    onReset: jest.fn()
  };

  const component = shallow(StartReset(props));
  component.find('button').simulate('click');
  expect(props.onReset).toHaveBeenCalled();
});
