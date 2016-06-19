require('babel-core/register');
require('babel-polyfill');

require('mocha');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
let sinonChai = require('sinon-chai');
let chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

let globals;

before(function() {
  globals = {
    chai,
    expect,
    sinon
  };

  Object.assign(global, globals);
});

after(function() {
  Object.keys(globals).forEach(key => delete global[key]);
});

