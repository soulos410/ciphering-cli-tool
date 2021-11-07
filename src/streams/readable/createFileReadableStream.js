const { createReadStream } = require("fs");

/**
 * Helper function for file readable stream creating
 * @param pathToFile: string
 * @param options: BufferEncoding | ReadStreamOptions
 * @returns ReadStream
 */
const createFileReadableStream = (pathToFile, options) => {
    const readableStream = createReadStream(pathToFile, options);

    readableStream.on("error", () => {
        process.stderr.write("Error: Can't get access to input file");

        process.exit(1);
    });

    return readableStream;
};

module.exports = { createFileReadableStream };
