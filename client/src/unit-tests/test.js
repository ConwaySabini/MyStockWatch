import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy, mock, stub } from 'sinon';
import Marlin from './src/components/Marlin';
import Nemo from './src/components/Nemo';

spy(Marlin.prototype, 'componentDidMount');

describe('<Marlin />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<Marlin />);
    expect(Marlin.prototype.componentDidMount.callCount).to.equal(1);
  });
});
