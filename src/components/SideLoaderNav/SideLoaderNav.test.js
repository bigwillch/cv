import React from 'react';
import { act } from 'react-dom/test-utils';
import { SideLoaderNav } from './SideLoaderNav';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

const sideClose = jest.fn();

describe('SideLoaderNav', () => {

  const createSideLoaderNavWrapper = () => mount(
    <SideLoaderNav
      sideClose={sideClose}
      description='Description'
    />
  );

  it('calls sideClose on back button click', () => {
    const wrapper = createSideLoaderNavWrapper();
    const backButtonOnClick = wrapper.find('nav > div.button--back').prop('onClick');
    backButtonOnClick();
    expect(sideClose).toHaveBeenCalledTimes(1);
  });

  it('calls toggleOpen on up button click', () => {
    const wrapper = createSideLoaderNavWrapper();
    expect(wrapper.find(SideLoaderNav).childAt(0).hasClass('open')).toEqual(false);
    const upButtonOnClick = wrapper.find('nav > div.button--up').prop('onClick');
    act(() => upButtonOnClick({ preventDefault: jest.fn }));
    wrapper.update();
    expect(wrapper.find(SideLoaderNav).childAt(0).hasClass('open')).toEqual(true);
  });
});