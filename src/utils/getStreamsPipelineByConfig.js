const {createFileReadableStream} = require("../streams/readable/createFileReadableStream");
const {createFileWritableStream} = require("../streams/writable/FileWritableStream");
const {OutputStream} = require("../streams/writable/OutputStream");
const {getTransformStreamsList} = require("../utils/getTransformSteamsList");

const getStreamsPipelineByConfig = (configOptionsMap) => {
  let inputStream;
  let outputStream;

  const transformsList = getTransformStreamsList(configOptionsMap.config);

  if (configOptionsMap.input) {
    inputStream = createFileReadableStream(configOptionsMap.input, "utf8");
  } else {
    inputStream = process.stdin;
  }

  if (configOptionsMap.output) {
    outputStream = createFileWritableStream(configOptionsMap.output, {encoding: "utf8", flags: "as"});
  } else {
    outputStream = new OutputStream();

    process.on("SIGINT", () => {
      outputStream._final();
    });

    process.stdin.setMaxListeners(100);
  }

  return { inputStream, outputStream, transformsList };
};

module.exports = { getStreamsPipelineByConfig };
