const fs = require("fs");

/**
 * Helper function for file writable stream creation
 * @param pathToFile: string
 * @param options: BufferEncoding | StreamOptions
 * @returns {WriteStream}
 */
const createFileWritableStream = (pathToFile, options) => {
    try {
        fs.accessSync(pathToFile);
    } catch(e) {
        process.stderr.write("Error: Can't get access to output file");

        process.exit(1);
    }

    return fs.createWriteStream(pathToFile, options);
};

module.exports = {createFileWritableStream};
