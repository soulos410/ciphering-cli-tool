const {checkDuplicates} = require("./utils/checkDuplicates");
const {createTransformStream} = require("./utils/createTransformStream");
const {validateConfigOptions} = require("./utils/validateConfigOptions");
const {validateInputConfig} = require("./utils/validateInputConfig");
const {getStreamsPipelineByConfig} = require("./utils/getStreamsPipelineByConfig");
const {getConfigOptionsMap} = require("./utils/getConfigOptionsMap");
const {customErrorsHandler} = require("./utils/customErrorsHandler");

const App = () => {
  const correctArgs = process.argv.slice(2);

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
  const { inputStream, outputStream, transformsList } = getStreamsPipelineByConfig(configOptionsMap);

  const stream = createTransformStream(transformsList, inputStream);

  stream.pipe(outputStream);
};

App();
