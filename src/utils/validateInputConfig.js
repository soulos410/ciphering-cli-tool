const {configOptions} = require("../constants");
const {CustomError} = require("../errors/CustomError");

const validateInputConfig = (config) => {
  if (!config.some((arg) => configOptions.includes(arg))) {
    throw new CustomError("Invalid config received \n", "InvalidConfigError");
  }
}

module.exports = { validateInputConfig };
