var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Response() {
  EventEmitter.call(this);
}

util.inherits(Response, EventEmitter);



Response.prototype.challenge = function(name, options) {
  this.emit('__challenge__', name, options);
  this.end();
}

Response.prototype.permit = function(scope) {
  this.emit('decision', true, scope);
  this.end();
}

Response.prototype.deny = function() {
  this.emit('decision', false);
  this.end();
}

Response.prototype.end = function() {
  this.emit('end');
}


module.exports = Response;
