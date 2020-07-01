import React from 'react';
import { Link } from './Link';
import { SideLoaderProvider } from 'Contexts';
import toJson from 'enzyme-to-json';
import Obfuscate from 'react-obfuscate';

const createLinkWrapper = (href, text = 'Basic Link') => mount(
  <SideLoaderProvider>
    <Link
      href={href}
    >
      { text }
    </Link>
  </SideLoaderProvider>
)

describe('Link', () => {

  it('should render external links', () => {

    const wrapper = createLinkWrapper('//www.google.com');

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').hasClass('button')).toEqual(false);
    expect(wrapper.find('a').hasClass('button--forward')).toEqual(false);
    expect(wrapper.find('a').prop('onClick')).toEqual(null);
    expect(wrapper.find('a').text()).toEqual('Basic Link');
  });

  it('should render hashtagged example links', () => {

    const wrapper = createLinkWrapper('/examples/page#example');

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').hasClass('button')).toEqual(true);
    expect(wrapper.find('a').hasClass('button--forward')).toEqual(true);
    expect(typeof wrapper.find('a').prop('onClick')).toEqual('function');
    expect(wrapper.find('a').text()).toEqual('Load example');
  });

  it('should render obfuscated email links', () => {

    const email = 'hidden@hidden.com';
    global.ENV.CONTACTEMAIL = email;

    const wrapper = createLinkWrapper('CONTACTEMAIL', 'email');

    expect(wrapper.find(Obfuscate).hasClass('email')).toEqual(true);
    expect(wrapper.find(Obfuscate).prop('email')).toEqual(email);

    delete global.ENV.CONTACTEMAIL;

  });

  it('should render obfuscated telephone links', () => {

    const tel = '0777777777';
    global.ENV.CONTACTTEL = tel;

    const wrapper = createLinkWrapper('CONTACTTEL', 'tel');

    expect(wrapper.find(Obfuscate).hasClass('tel')).toEqual(true);
    expect(wrapper.find(Obfuscate).prop('tel')).toEqual(tel);

    delete global.ENV.CONTACTTEL;

  });

});