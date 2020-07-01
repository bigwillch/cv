import React from 'react';
import { act } from 'react-dom/test-utils';
import Measure, * as CJSMeasure from 'react-measure';
import toJson from 'enzyme-to-json';
import { clear, mockUserAgent } from 'jest-useragent-mock'
import { List } from './List';

const createMeasureSpy = (contentRect) => jest
  .spyOn(CJSMeasure, 'default')
  .mockImplementation(
    ({ children }) => children({
      measure: jest.fn(),
      measureRef: null,
      contentRect,
    })
  );

describe('List', () => {

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
    expect(wrapper.first().childAt(0).type()).toEqual(Measure);
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

    const wrapper = mount(ExampleList);
    const onResize = wrapper.find(Measure).prop('onResize');

    act(() => onResize(contentRect));
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('ul').hasClass('scrollable')).toEqual(true);
    expect(typeof wrapper.find('ul').prop('onScroll')).toEqual('function');
    expect(wrapper.find('ul + span').text()).toEqual('scroll me');
  });

  it('should not be scrollable if viewport is wide', () => {

    const contentRect = {
      scroll: {
        left: 0,
        width: 200,
      },
      client: {
        width: 300,
      }
    };

    const wrapper = mount(ExampleList);
    const onResize = wrapper.find(Measure).prop('onResize');

    act(() => onResize(contentRect));
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('ul').hasClass('scrollable')).toEqual(false);
    expect(wrapper.find('ul').prop('onScroll')).toEqual(null);
    expect(wrapper.find('ul + span').exists()).toEqual(false);
  });

  it('should register when scrolled', () => {

    const contentRect = {
      scroll: {
        left: 150,
        width: 200,
      },
      client: {
        width: 100,
      }
    };

    const measureSpy = createMeasureSpy(contentRect);
    const wrapper = mount(ExampleList);

    const onResize = wrapper.find(measureSpy).prop('onResize');
    act(() => {
      onResize(contentRect);
    });
    wrapper.update();
    
    const onScroll = wrapper.find('ul').prop('onScroll');
    act(() => {
      onScroll();
    });
    wrapper.update();

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('ul').hasClass('scrolled')).toEqual(true);
    expect(wrapper.find('ul + span').text()).toEqual('scroll me');
  });


});
