const { pipeline } = require("stream").promises;
const {
  checkDuplicates,
  validateConfigOptions,
  validateInputConfig,
  getStreamsPipelineByConfig,
  getConfigOptionsMap,
  customErrorsHandler,
  getCorrectArgs,
} = require("../utils");

const App = async () => {
  const correctArgs = getCorrectArgs();

  try {
    validateInputConfig(correctArgs);
  } catch(e) {
    customErrorsHandler(e);
  }

  const configKeys = correctArgs.filter((option, index) => index % 2 === 0);

  try {
    checkDuplicates(configKeys);
  } catch(e) {
    customErrorsHandler(e);
  }

  const configValues = correctArgs.filter((option, index) => index % 2 !== 0);

  const configOptionsMap = getConfigOptionsMap(configKeys, configValues);

  try {
    validateConfigOptions(configOptionsMap);
  } catch (e) {
    customErrorsHandler(e);
  }

  try {
    const { inputStream, outputStream, transformsList } = await getStreamsPipelineByConfig(configOptionsMap);

    await pipeline(
            inputStream,
            ...transformsList,
            outputStream,
    );

  } catch(e) {
    customErrorsHandler(e);
  }
};

module.exports = { App };
