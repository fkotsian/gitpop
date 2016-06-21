require('babel-core/register');
require('babel-polyfill');

require('mocha');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');

let sinonChai = require('sinon-chai');
let chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

let globals;

before(function() {
  globals = {
    chai,
    expect,
    sinon,
    React,
    ReactDOM,
  };

  Object.assign(global, globals);
});

after(function() {
  Object.keys(globals).forEach(key => delete global[key]);
});

