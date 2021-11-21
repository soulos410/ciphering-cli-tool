const { createReadStream } = require("fs");
const {CustomError} = require("../../errors/CustomError");

/**
 * Helper function for file readable stream creating
 * @param pathToFile: string
 * @param options: BufferEncoding | ReadStreamOptions
 * @returns ReadStream
 */
const createFileReadableStream = async (pathToFile, options) => {
    try {
        const fileReadStream = createReadStream(pathToFile, options);

        await new Promise((resolve, reject) => {
            fileReadStream.on("open", () =>
                resolve()
            );

            fileReadStream.on("error", (e) =>
                reject(e)
            );
        });

        return fileReadStream;
    } catch(e) {
        throw new CustomError("Cannot get access to input file", "InvalidInputError");
    }
};

module.exports = { createFileReadableStream };
