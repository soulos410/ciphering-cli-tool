const {CustomError} = require("../errors/CustomError");

const validateConfigOptions = (configOptionsMap) => {
  const hasInvalidConfig = configOptionsMap.config.split("-").some(([option]) => option.toUpperCase() !== option);

  if (hasInvalidConfig) {
    throw new CustomError("Invalid config received. Check case of your config options \n", "InvalidOptionsError");
  }
}

module.exports = { validateConfigOptions };
