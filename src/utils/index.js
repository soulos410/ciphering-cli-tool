const { checkDuplicates } = require("./checkDuplicates");
const { createTransformStream } = require("./createTransformStream");
const { customErrorsHandler } = require("./customErrorsHandler");
const { getAlgorithToTransform } = require("./getAlgorithToTransform");
const { getConfigOptionsMap } = require("./getConfigOptionsMap");
const { getCorrectArgs } = require("./getCorrectArgs");
const { getStreamsPipelineByConfig } = require("./getStreamsPipelineByConfig");
const { getTransformSteamsList } = require("./getTransformSteamsList");
const { isLowerCase } = require("./isLowerCase");
const { validateConfigOptions } = require("./validateConfigOptions");
const { validateInputConfig } = require("./validateInputConfig");

module.exports = {
  checkDuplicates,
  createTransformStream,
  customErrorsHandler,
  getAlgorithToTransform,
  getConfigOptionsMap,
  getCorrectArgs,
  getStreamsPipelineByConfig,
  getTransformSteamsList,
  isLowerCase,
  validateConfigOptions,
  validateInputConfig,
};
