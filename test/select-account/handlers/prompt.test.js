/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../com/select-account/handlers/prompt');


describe('select-account/handlers/prompt', function() {
  
  it('should create handler', function() {
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../../com/select-account/handlers/prompt', {
      'csurf': csurfSpy,
      'flowstate': flowstateSpy
    });
    
    var authenticator = new Object();
    authenticator.authenticate = sinon.spy();
    var store = new Object();
    var handler = factory(authenticator, store);
    
    expect(handler).to.be.an('array');
    expect(csurfSpy).to.be.calledOnce;
    expect(csurfSpy).to.be.calledBefore(flowstateSpy);
    expect(flowstateSpy).to.be.calledOnce;
    expect(flowstateSpy).to.be.calledWith({ store: store });
    expect(flowstateSpy).to.be.calledBefore(authenticator.authenticate);
    expect(authenticator.authenticate).to.be.calledOnce;
    expect(authenticator.authenticate).to.be.calledWith('session', { multi: true });
  });
  
});
