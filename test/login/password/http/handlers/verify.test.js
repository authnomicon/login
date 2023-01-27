/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../../../com/login/password/http/handlers/verify');


describe('password/http/handlers/verify', function() {
  
  var handler;

  before(function() {
    function authenticate(mechanism) {
      return function(req, res, next) {
        req.login = function(user, info, cb) {
          process.nextTick(function() {
            req.session.user = user;
            req.session.method = info.method;
            cb();
          });
        };
      
        req.user = { id: '248289761001', displayName: 'Jane Doe' };
        req.authInfo = { method: 'password' };
        next();
      };
    }
    
    /*
    function state() {
      return function(req, res, next) {
        next();
      };
    }
    */
    
    var authenticateSpy = sinon.spy(authenticate);
    //var stateSpy = sinon.spy(state);
    
    handler = factory({ authenticate: authenticateSpy }, undefined);
    
    // TODO: Put this back
    //expect(authenticateSpy).to.be.calledOnceWith('www-form/password');
    //expect(stateSpy).to.be.calledOnce;
  });
  
  it('verifying username and password', function(done) {
    
    chai.express.use(handler)
      .request(function(req, res) {
        req.connection = {};
        req.method = 'POST';
        req.body = {
          username: 'jane',
          password: 'opensesame',
          csrf_token: '3aev7m03-1WTaAw4lJ_GWEMkjwFBu_lwNWG8'
        };
        req.session = {
          csrfSecret: 'zbVXAFVVUSXO0_ZZLBYVP9ue'
        };
        
        res.resumeState = sinon.spy(function(cb) {
          process.nextTick(cb);
        });
      })
      .finish(function() {
        expect(this.req.session).to.deep.equal({
          csrfSecret: 'zbVXAFVVUSXO0_ZZLBYVP9ue',
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          method: 'password'
        });
        
        expect(this.statusCode).to.equal(302);
        expect(this.getHeader('Location')).to.equal('/');
        
        done();
      })
      .listen();
      
  }); // authenticating username and password
  
});
