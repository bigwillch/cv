import React from 'react';
import * as Measure from 'react-measure';
// const Measure = jest.requireActual('react-measure');
import toJson from 'enzyme-to-json';
import { clear, mockUserAgent } from 'jest-useragent-mock'
import { List } from './List';

// jest.mock('react-measure');

// jest.mock('react-measure', () => () => <span>MultiSelect</span>)

describe('List', () => {

  // beforeEach(() => {
  //   jest.resetModules();
  // });

  afterEach(() => {
    clear();
  })

  const ExampleList = (
    <List>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  );

  it('should just return a list if pre-rendered via React-Snap', () => {
    mockUserAgent('ReactSnap')
    const wrapper = mount(ExampleList);
    expect(wrapper.first().childAt(0).equals(ExampleList));
  });

  it('should be wrapped in Measure if not pre-rendered', () => {
    const wrapper = mount(ExampleList);
    expect(wrapper.first().childAt(0).type()).toEqual(Measure.default);
    expect(wrapper.find(Measure).find(ExampleList));
  });

  it('should be scrollable if viewport is narrow', () => {

    const contentRect = {
      scroll: {
        left: 0,
        width: 200,
      },
      client: {
        width: 100,
      }
    };

    const measureSpy = jest
      .spyOn(Measure, 'default')
      .mockImplementation(
        ({ children }) => (
          <>
          {
            children({
              measure: jest.fn(),
              measureRef: null,
              contentRect,
            })
          }
          </>
        )
      );

    const wrapper = mount(ExampleList);
    const onResize = wrapper.find(measureSpy).prop('onResize');
    onResize(contentRect);
    wrapper.update();

    expect(toJson(wrapper)).toMatchSnapshot();

    measureSpy.mockRestore();
  });
});
