
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
// var TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
// var expect = require('expect');

import { shallow, mount, render } from 'enzyme';
// const wrapper = shallow(<Foo />);

// import React, {TestUtils} from 'react'
import { expect } from 'chai'
import { App } from '../src/App.js'
import Search from '../src/components/Search.js'
import Meta from '../src/components/Meta.js'

// import React from 'React'
// import ReactTestUtils from 'react/lib/ReactTestUtils'
// import expect from 'expect'
// import App from '../src/App.js'

let testComponent = (<div className="home">Hi world</div>)

console.log('testComponent')
console.log(testComponent)

console.log('App')
console.log(App)

describe('App', function () {
  it('renders without problems', function () {

    const a = shallow(<App />);
    console.log('a')
    console.log(a.html())
    console.log(a.contains(<h1><b>TODO: add color range to bars too! subtle orange fade for higher values</b></h1>))
    // expect(a.contains(<Search />)).to.equal(true)
    expect(a.contains(<Meta  profile={{}} />)).to.equal(true)
    // expect(a.contains(<Search />)).to.equal(true)
    // expect(false).to.equal(false)
    // expect(42).to.equal(42);
    // expect(null).toExist()
    // expect(app).toExist();
  });
});


