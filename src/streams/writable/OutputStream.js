const {Writable} = require("stream");

/**
 * Writable stream for stdin input handling
 */
class OutputStream extends Writable {
    #input = "";

    _write(chunk, encoding, callback) {
        this.#input += Buffer.from(chunk).toString();

        callback();
    }

    _final(callback) {
        process.stdout.write(`\n${this.#input}\n`);

        process.exit(0);
    }
}

module.exports = { OutputStream };
