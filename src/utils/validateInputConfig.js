const {configOptions} = require("../constants");
const {CustomError} = require("../errors/CustomError");
const {customErrorsHandler} = require("./customErrorsHandler");

const validateInputConfig = (config) => {
  try {
    if (!config.some((arg) => configOptions.includes(arg))) {
      throw new CustomError("Invalid config received \n", "InvalidConfigError");
    }
  } catch(e) {
    customErrorsHandler(e);
  }
}

  module.exports = { validateInputConfig };
