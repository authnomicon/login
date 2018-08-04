/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/otp/http/service');


describe('http/otp/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.authnomicon.org/js/http/login/OTPService'
    ]);
    expect(factory['@path']).to.equal('/login/otp');
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
