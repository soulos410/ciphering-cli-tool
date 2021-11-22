const { getTransformStreamByConfig } = require("./getAlgorithToTransform");

const getTransformStreamsList = (configOptionsString) =>
    configOptionsString.split("-").map((option) =>
        getTransformStreamByConfig(option));

module.exports = { getTransformStreamsList };
