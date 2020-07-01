import React from 'react';
import { Link } from './Link';
import { SideLoaderContext } from 'Contexts';
import toJson from 'enzyme-to-json';
import Obfuscate from 'react-obfuscate';

const sideLoaderContextValue = {
  actions: {
    sideTrigger: jest.fn(),
  }
}

const createLinkWrapper = ({
  href,
  text = 'Basic Link',
  value = sideLoaderContextValue,
}) => mount(
  <SideLoaderContext.Provider value={value}>
    <Link
      href={href}
    >
      { text }
    </Link>
  </SideLoaderContext.Provider>
)

describe('Link', () => {

  it('should render external links', () => {

    const wrapper = createLinkWrapper({ href: '//www.google.com' });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').hasClass('button')).toEqual(false);
    expect(wrapper.find('a').hasClass('button--forward')).toEqual(false);
    expect(wrapper.find('a').prop('onClick')).toEqual(null);
    expect(wrapper.find('a').text()).toEqual('Basic Link');
  });

  it('should render hashtagged example links', () => {

    const wrapper = createLinkWrapper({ href: '/examples/page#example' });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').hasClass('button')).toEqual(true);
    expect(wrapper.find('a').hasClass('button--forward')).toEqual(true);
    expect(typeof wrapper.find('a').prop('onClick')).toEqual('function');
    expect(wrapper.find('a').text()).toEqual('Load example');
  });

  it('should trigger sideloader when clicked for hashtagged example links', () => {

    const {
      actions: {
        sideTrigger,
      }
    } = sideLoaderContextValue;

    const wrapper = createLinkWrapper({
      href: '/examples/page#example',
      text: 'Example description',
    });
    const onClick = wrapper.find('a').prop('onClick');

    onClick({ preventDefault: jest.fn });

    expect(sideTrigger).toHaveBeenCalledTimes(1);
    expect(sideTrigger).toHaveBeenCalledWith({
      desc: 'Example description',
      href: '/examples/page',
    });

  });

  it('should render obfuscated email links', () => {

    const email = 'hidden@hidden.com';
    global.ENV.CONTACTEMAIL = email;

    const wrapper = createLinkWrapper({
      href: 'CONTACTEMAIL',
      text: 'email',
    });

    expect(wrapper.find(Obfuscate).hasClass('email')).toEqual(true);
    expect(wrapper.find(Obfuscate).prop('email')).toEqual(email);

    delete global.ENV.CONTACTEMAIL;

  });

  it('should render obfuscated telephone links', () => {

    const tel = '0777777777';
    global.ENV.CONTACTTEL = tel;

    const wrapper = createLinkWrapper({
      href: 'CONTACTTEL',
      text: 'tel',
    });

    expect(wrapper.find(Obfuscate).hasClass('tel')).toEqual(true);
    expect(wrapper.find(Obfuscate).prop('tel')).toEqual(tel);

    delete global.ENV.CONTACTTEL;

  });

  it('should return null for email links if env variable not set', () => {
    const wrapper = createLinkWrapper({
      href: 'CONTACTEMAIL',
      text: 'email',
    });
    expect(wrapper.find('a').exists()).toEqual(false);
  });

  it('should return null for telephone links if env variable not set', () => {
    const wrapper = createLinkWrapper({
      href: 'CONTACTTEL',
      text: 'tel',
    });
    expect(wrapper.find('a').exists()).toEqual(false);
  });

});