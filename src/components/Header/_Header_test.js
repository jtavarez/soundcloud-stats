

// 

import { expect } from 'chai'
// Don't forget, sinon defined in global scope thanks to karma-sinon plugin

import React from 'react';
import { shallow } from 'enzyme';

import Header from 'components/Header/Header.js'

import profile from 'util/_mockdata_profile.json'
import tracks from 'util/_mockdata_tracks.json'

import {
  getProfileDetails,
  DEFAULT_USERNAME_TEXT,
  keys
} from 'util.js'

// Initial state and API responses always run through this logic
let profileProp = getProfileDetails(profile, tracks)

describe('<Header>:', ()=>{
  let headerWrapper
  before(()=>{
    // runs before all tests in this block
    headerWrapper = shallow(<Header profile={profileProp} />);
  })
  after(()=>{
    headerWrapper = null
  })

  it('Should render with 2 headers with respective classnames (Header__user, Header__search)', ()=>{
    expect(headerWrapper.find('header.Header__user')).to.have.length(1)
    expect(headerWrapper.find('header.Header__search')).to.have.length(1)
  })

  it('Should render default text if profile data passed in is null', ()=>{
      headerWrapper.setProps({
        profile: {
          username: null,
          fullName: null
        }
      })
      expect(headerWrapper.find('.Header__user__accountName')).to.have.length(1)
      expect(headerWrapper.find('.Header__user__fullName')).to.have.length(0)
      expect(headerWrapper.find('.Header__user h2').text()).to.equal(DEFAULT_USERNAME_TEXT)
  })

  it('Next to username, the full name in parenthesis should be shown if provided, otherwise show just the username',()=>{
      headerWrapper.setProps({
        profile: {
          username: 'jsmitty',
          fullName: null
        }
      })
      expect(headerWrapper.find('.Header__user__accountName')).to.have.length(1)
      expect(headerWrapper.find('.Header__user__fullName')).to.have.length(0)
      expect(headerWrapper.find('.Header__user h2').text()).to.equal('jsmitty')

      headerWrapper.setProps({
        profile: {
          username: 'jsmitty',
          fullName: 'John Smith'
        }
      })
      expect(headerWrapper.find('.Header__user__accountName')).to.have.length(1)
      expect(headerWrapper.find('.Header__user__fullName')).to.have.length(1)
      expect(headerWrapper.find('.Header__user h2').text()).to.equal('jsmitty (John Smith)')
  })


  it('Should call submit() prop on enter, only if there is text to submit (after trimming)',()=>{

    const submit = sinon.spy()
    headerWrapper.setProps({submit})

    // Random key (not enter), should not fire callback
    headerWrapper.setState({searchValue:""})
    headerWrapper.find('input').simulate('keydown', {keyCode: 81}) // q key
    expect(submit.callCount).to.equal(0)

    // Enter key with blank input shouldn't do anything
    headerWrapper.setState({searchValue:"   "})
    headerWrapper.find('input').simulate('keydown', {keyCode:keys.ENTER})  
    expect(submit.callCount).to.equal(0)

    // Enter key pressed with input should fire callback
    headerWrapper.setState({searchValue:"John Smitty"})
    headerWrapper.find('input').simulate('keydown', {keyCode:keys.ENTER})
    expect(submit.calledOnce).to.equal(true)

  })
  it('Should have input cleared after submit() is called',()=>{
    const submit = sinon.spy()
    headerWrapper.setProps({submit})
    headerWrapper.setState({searchValue:"John Smitty"})
    headerWrapper.find('input').simulate('keydown', {keyCode:keys.ENTER})
    expect(headerWrapper.state().searchValue).to.equal("")

  })



})
