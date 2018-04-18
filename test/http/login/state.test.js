/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/http/login/state');


describe('http/login/state', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/ceremony/Prompt');
    expect(factory['@name']).to.equal('login');
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
