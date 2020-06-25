import React from 'react';
import { ListItem } from './ListItem';
import toJson from 'enzyme-to-json';

describe('ListItem', () => {
  const wrapper = mount(
    <ListItem>
      <p>List Item Content</p>
    </ListItem>
  );

  it('should wrap children in a span', () => {
    expect(wrapper.first().find('li').childAt(0).type()).toEqual('span');
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});