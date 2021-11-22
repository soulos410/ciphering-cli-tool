const fs = require("fs");
const {CustomError} = require("../../errors/CustomError");

/**
 * Helper function for file writable stream creation
 * @param pathToFile: string
 * @param options: BufferEncoding | StreamOptions
 * @returns {WriteStream}
 */
const createFileWritableStream = async (pathToFile, options) => {
    try {

        fs.accessSync(pathToFile);

        const fileWriteStream =  fs.createWriteStream(pathToFile, options);

        await new Promise((resolve, reject) => {
            fileWriteStream.on("error", (e) =>
                reject(e)
            );

            fileWriteStream.on("open", () => {
                resolve();
            });
        });

        return fileWriteStream;
    } catch(e) {
        throw new CustomError("Cannot get access to output file", "InvalidOutputError");
    }
};

module.exports = { createFileWritableStream };
