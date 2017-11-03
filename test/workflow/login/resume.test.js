/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/workflow/login/resume');


describe('workflow/login/resume', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
});
