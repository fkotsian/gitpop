require('babel-core/register');
require('babel-polyfill');

require('testdom')('<html><body><div id="app"></div></body></html>');

require('mocha');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const {shallow, mount, render} = require('enzyme');

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
    shallow,
    mount,
    render
  };

  Object.assign(global, globals);

  console.error = (err) => { throw new Error(err); };
});

after(function() {
  Object.keys(globals).forEach(key => delete global[key]);
});
