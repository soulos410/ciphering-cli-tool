class CustomError extends Error {
  constructor(message, errorName) {
    super(message);

    this.message = message;
    this.errorName = errorName;
    this.isSystemError = false;
  }
}

module.exports = { CustomError };
