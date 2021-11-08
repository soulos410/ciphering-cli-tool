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

        const fileWriteStream =  fs.createWriteStream(pathToFile, options);

        fileWriteStream.on("close", () => {
            fs.appendFile(pathToFile, " ", (err => {
                if (err) {
                    console.error(err);

                    process.exit(1);
                }
            }));
        })

        return fileWriteStream;
    } catch(e) {
        process.stderr.write("Error: Can't get access to output file \n");

        process.exit(1);
    }
};

module.exports = { createFileWritableStream };
