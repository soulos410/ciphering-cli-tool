const {
    Readable,
    Writable,
    Transform,
} = require("stream");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

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
 * Function only for reading user input from stdin
 */
const readUserInput = () => {
    const stdin = process.stdin;
    let input = "";

    process.on('SIGINT', () => {
        writeUserInput(input);

        process.exit();
    });

    process.stdin.setEncoding("utf8");
    process.stdin.resume();

    stdin.on("data", (data) => {
        input += Buffer.from(data).toString();
    });

    stdin.on("error", (error) => {
        console.error(error);
    });
};

/**
 * Function only for printing encoded/decoded result of user input
 * @param input: string, user input
 */
const writeUserInput = (input) => {
    const stdout = process.stdout;

    process.stdout.write("\n");

    stdout.write(input);
};

// function writeStream() {
//     return new Writable({
//         write(chunk, encoding = "utf8", callback) {
//             const converted = Buffer.from(chunk).toString();
//
//             console.log(converted);
//
//             callback();
//         },
//         destroy(error, callback) {
//             console.log("destroy", error, callback);
//
//             if (callback) {
//                 callback();
//             }
//         }
//     });
// }

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
           readUserInput();
        }
    }
};

App();

// const counterReader = new CounterReader({ highWaterMark: 2 });
// const counterWriter = new CounterWriter({ highWaterMark: 2 });
// const counterTransform = new CounterTransform({ highWaterMark: 2 });
//
// counterReader.pipe(counterTransform).pipe(counterWriter);

// const readableStream = new Readable({
//     read() {}
// })
// const writableStream = new Writable()
//
// writableStream._write = (chunk, encoding, next) => {
//     console.log(chunk.toString())
//     next()
// }
//
// readableStream.pipe(writableStream)
//
// readableStream.push('hi!')
// readableStream.push('ho!')



// function renderer () {
//     return new Writable({
//         objectMode: true,
//         write: (data, _, done) => {
//             console.log('<-', data)
//             done()
//         }
//     })
// }
//
// clock();
// renderer();

// todo writable stream example
// const { PassThrough, Writable } = require('stream');
// const pass = new PassThrough();
// const writable = new Writable();
//
// pass.pipe(writable);
// pass.unpipe(writable);
// // readableFlowing is now false.
//
// pass.on('data', (chunk) => { console.log(chunk.toString()); });
// pass.write('ok');  // Will not emit 'data'.
// pass.resume();     // Must be called to make stream emit 'data'.
