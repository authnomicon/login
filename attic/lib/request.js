var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Request(user) {
  EventEmitter.call(this);
  this.user = user;
}

util.inherits(Request, EventEmitter);


module.exports = Request;
