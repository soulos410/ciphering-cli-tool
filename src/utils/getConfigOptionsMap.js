const {validOptions} = require("../constants");

const getConfigOptionsMap = (configKeys, configValues) => configKeys.reduce((acc, optionKey, index) => {
  const key = Object.keys(validOptions).find((key) => {
    return validOptions[key].includes(optionKey);
  })

  return ({
    ...acc,
    [key]: configValues[index],
  });
}, {});

module.exports = { getConfigOptionsMap };
