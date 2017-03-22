/**
 * `RepromptError` error.
 *
 * @constructor
 * @api private
 */
function RepromptError(state) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'RepromptError';
  this.message = 'Login attempt failed';
  this.state = state;
}

// Inherit from `Error`.
RepromptError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = RepromptError;
