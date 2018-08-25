/**
 * `AuthenticatorBindingRequiredError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticatorBindingRequiredError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticatorBindingRequiredError';
  this.message = message;
  this.status = status || 403;
}

// Inherit from `Error`.
AuthenticatorBindingRequiredError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticatorBindingRequiredError;
