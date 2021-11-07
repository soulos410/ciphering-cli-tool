const { createWriteStream } = require("fs");

/**
 * Helper function for file writable stream creation
 * @param pathToFile: string
 * @param options: BufferEncoding | StreamOptions
 * @returns {WriteStream}
 */
const createFileWritableStream = (pathToFile, options) => {
    const fileWritableStream = createWriteStream(pathToFile, options);

    fileWritableStream.on("error", () => {
        process.stderr.write("Error: Can't get access to output file");

        process.exit(1);
    });

    return fileWritableStream;
};

module.exports = {createFileWritableStream};
