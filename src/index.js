const {
    Readable,
    Writable,
    Transform,
} = require("stream");

/**
 * Lowercase letters of English alphabet
 * @type {string[]}
 */
const alphabet = [
    "a", "b", "c",
    "d", "e", "f",
    "g", "h", "i",
    "j", "k", "l",
    "m", "n", "o",
    "p", "q", "r",
    "s", "t", "u",
    "v", "w", "x",
    "y", "z",
];

/**
 * All possible config options/aliases
 * @type {string[]}
 */
const configOptions = [
    "-c",
    "--config",
];

/**
 * All possible input file options/aliases
 * @type {string[]}
 */
const inputOptions = [
    "-i",
    "--input",
];

/**
 * All possible output file options/aliases
 * @type {string[]}
 */
const outputOptions = [
    "-o",
    "--output",
];

/**
 * Function for duplicates check in entered config
 * @param configKeys: string[]
 */
const checkDuplicates = (configKeys) => {
    const configKeysCount = configKeys.reduce((acc, key) =>
        configOptions.includes(key)
            ? acc + 1
            : acc, 0
    );

    if (configKeysCount > 1) {
        process.stderr.write("Options duplicated\n");

        process.exit(4);
    }
};

/**
 * Transform stream for stdin input transform
 */
class TransformByConfig extends Transform {
    constructor(config) {
        super();

        console.log("config", config);
        this.config = config;
    }

    push(chunk, encoding) {
        return super.push(chunk, encoding);
    }

    _transform(chunk, encoding, callback) {
        this.push(Buffer.from(chunk).toString());

        callback();
    }
}

/**
 * Writable stream for stdin input handling
 */
class WritableStream extends Writable {
    #input = "";

    _write(chunk, encoding, callback) {
        this.#input += Buffer.from(chunk).toString();
        // console.log("this input", this.#input);
        return false;
    }

    end(cb) {
        console.log("end?");
        super.end(cb);
    }

    _final(callback) {
        process.stdout.write(this.#input);
        this.end();
    }
}

/**
 * Function only for reading user input from stdin
 */
const readUserInput = (optionsMap) => {
    const stdin = process.stdin;
    const userConfigList = Object.entries(optionsMap).find(([optionKey]) =>
        configOptions.includes(optionKey)
    )[1].split("-");

    process.stdin.setEncoding("utf8");
    process.stdin.resume();

    stdin.on("error", (error) => {
        // todo process.stderr?
        console.error(error);
    });

    const transformStream = new TransformByConfig(userConfigList);
    const writableStream = new WritableStream();

    process.stdin.pipe(transformStream).pipe(writableStream);
};

/**
 * Function only for printing encoded/decoded result of user input
 * @param input: string, user input
 * @deprecated
 */
const writeUserInput = (input) => {
    const stdout = process.stdout;

    process.stdout.write("\n");

    stdout.write(input);
};

const App = () => {
    const correctArgs = process.argv.slice(2);

    if (!correctArgs.some((arg) => configOptions.includes(arg))) {
        process.stderr.write("Invalid config received \n");

        process.exit(4);
    } else {
        const configKeys = correctArgs.filter((option, index) => index % 2 === 0);

        checkDuplicates(configKeys);

        const configValues = correctArgs.filter((option, index) => index % 2 !== 0);

        const configOptionsMap = configKeys.reduce((acc, optionKey, index) => ({
            ...acc,
            [optionKey]: configValues[index],
        }), {});

        if (configKeys.some((key) => inputOptions.includes(key))) {
            console.log("input file received");
        } else {
           readUserInput(configOptionsMap);
        }
    }
};

App();
