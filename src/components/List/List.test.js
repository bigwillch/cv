import React from 'react';
import Measure from 'react-measure';
import toJson from 'enzyme-to-json';
import { clear, mockUserAgent } from 'jest-useragent-mock'
import { List } from './List';

describe('List', () => {

  afterEach(() => {
    clear()
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
});
