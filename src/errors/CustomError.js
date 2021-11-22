class CustomError extends Error {
  constructor(message, errorName) {
    super(message);

    this.message = message;
    this.errorName = errorName;
  }
}

module.exports = { CustomError };
