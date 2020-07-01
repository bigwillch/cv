import React from 'react';
import { SideLoader, SideLoaderNav } from 'Components';
import { SideLoaderContext } from 'Contexts';
import toJson from 'enzyme-to-json';

const sideLoaderContextValue = {
  state: {
    href: null,
    desc: null,
  },
  actions: {
    sideLoaded: jest.fn(() => 'loaded'),
    sideClose: jest.fn(() => 'close'),
  }
}

const createSideLoaderWrapper = (value = sideLoaderContextValue) => mount(
  <SideLoaderContext.Provider value={value}>
    <SideLoader />
  </SideLoaderContext.Provider>
)

describe('SideLoader', () => {

  it('should render empty if no href is set in context state', () => {
    const wrapper = createSideLoaderWrapper();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.childAt(0).exists()).toEqual(false);
  });

  it('should render iframe and nav i,f href is set in context state', () => {
    const wrapper = createSideLoaderWrapper({
      ...sideLoaderContextValue,
      state: {
        href: 'examples/document',
        desc: 'Description',
      }
    });
    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find('iframe').prop('src')).toEqual('examples/document');
    expect(wrapper.find('iframe').prop('onLoad')).toEqual(sideLoaderContextValue.actions.sideLoaded);
    expect(wrapper.find('SideLoaderNav').prop('description')).toEqual('Description');
    expect(wrapper.find('SideLoaderNav').prop('sideClose')).toEqual(sideLoaderContextValue.actions.sideClose);
  });
});