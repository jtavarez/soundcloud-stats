// Simple test for our <Alert> component to ensure proper classes are added and tied to
// status object, along with displaying of actual message

import { expect } from 'chai'
import React from 'react';
import { shallow } from 'enzyme';
import { statusCodes } from 'util/statusCodes'

import Alert from 'components/Alert/Alert.js'

describe('<Alert>', function () {

  let alertWrapper

  before(()=>{
    alertWrapper = shallow(<Alert status={null} />);
  });
  after(()=>{
    alertWrapper
  })
  it('should return null if status property is null', function(){
    expect(alertWrapper.html()).to.equal(null)
  })
  it('should contain single <div> and <p> with a proper status passed', function(){
    const status = statusCodes.LOGGED_IN_USER
    alertWrapper.setProps({status})

    const alertDiv = alertWrapper.find('div')

    expect(alertDiv).to.have.length(1)
    expect(alertDiv.hasClass('Alert')).to.equal(true)
    expect(alertWrapper.find('p')).to.have.length(1)
  })
  it('should have proper classes defined', function(){
    // The following 2 messages should have their respective classes applied
    // Neutral message
    alertWrapper.setProps({status:statusCodes.LOGGED_IN_USER})

    const alertDiv = alertWrapper.find('div')
    expect(alertDiv.hasClass('Alert')).to.equal(true)
    expect(alertDiv.hasClass('Alert--neutral')).to.equal(true)
    // Negative
    alertWrapper.setProps({status:statusCodes.CANNOT_CONNECT})
    const alertDiv2 = alertWrapper.find('div')
    expect(alertDiv2.hasClass('Alert')).to.equal(true)
    expect(alertDiv2.hasClass('Alert--negative')).to.equal(true)
    
  })
});
