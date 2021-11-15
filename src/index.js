const {checkDuplicates} = require("./utils/checkDuplicates");
const {createTransformStream} = require("./utils/createTransformStream");
const {validateConfigOptions} = require("./utils/validateConfigOptions");
const {validateInputConfig} = require("./utils/validateInputConfig");
const {getStreamsPipelineByConfig} = require("./utils/getStreamsPipelineByConfig");
const {getConfigOptionsMap} = require("./utils/getConfigOptionsMap");

const App = () => {
  const correctArgs = process.argv.slice(2);

  validateInputConfig(correctArgs);

  const configKeys = correctArgs.filter((option, index) => index % 2 === 0);

  checkDuplicates(configKeys);

  const configValues = correctArgs.filter((option, index) => index % 2 !== 0);

  const configOptionsMap = getConfigOptionsMap(configKeys, configValues);

  validateConfigOptions(configOptionsMap);

  const { inputStream, outputStream, transformsList } = getStreamsPipelineByConfig(configOptionsMap);

  const stream = createTransformStream(transformsList, inputStream);

  stream.pipe(outputStream);
};

App();
