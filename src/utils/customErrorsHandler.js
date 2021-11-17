const {CustomError} = require("../errors/CustomError");
const customErrorsHandler = (error) => {

  if (error instanceof CustomError) {
    process.stderr.write(`${error.errorName}: ${error.message}`);

    process.exit(1);
  } else {
    throw error;
  }
};

module.exports = { customErrorsHandler };
