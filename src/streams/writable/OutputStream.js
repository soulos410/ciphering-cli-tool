const { Writable } = require("stream");

/**
 * Writable stream for stdin input handling
 */
class OutputStream extends Writable {
    constructor() {
        super();

        this.input = "";
    }

    _write(chunk, encoding, callback) {
        this.input += chunk.toString();

        callback();
    }

    _final(callback) {
        process.stdout.write(`\n${this.input}\n`);

        process.exit(0);
    }
}

module.exports = { OutputStream };
