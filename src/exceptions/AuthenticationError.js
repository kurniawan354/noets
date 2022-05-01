const ClientError = require('./ClientError');

class authenticationError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'authenticationError';
  }
}

module.exports = authenticationError;
