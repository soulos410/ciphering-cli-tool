const {
    Readable,
    Writable,
    Transform,
} = require("stream");

const configOptions = [
    "-c",
    "--config",
];

const inputOptions = [
    "-i",
    "--input",
];

const outputOptions = [
    "-o",
    "--output",
];

const checkDuplicates = (configKeys) => {
    const configKeysCount = configKeys.reduce((acc, key) =>
        configOptions.includes(key)
            ? acc + 1
            : acc, 0
    );

    if (configKeysCount > 1) {
        process.stderr.write("Options duplicated\n");

        process.kill(process.pid, 4);
    }
}

function readUserInput() {
    const readableStream = new Readable({
        read(size) {

        }
    });

    readableStream.resume();
    readableStream.setEncoding("utf8");

    let _input = "";

    readableStream.on("data", (chunk) => {
        readableStream.push(chunk);
        _input += chunk;
    });

    readableStream.on("end", () => {
        console.log(_input);
    });

    readableStream.on("error", (error) => {
        console.log(error.stack);
    });

    readableStream.pipe(writeStream());

    return _input;
}

function writeStream() {
    return new Writable({
        write(chunk, encoding, callback) {
            console.log("CHUNK", chunk);

            callback();
        },
        destroy(error, callback) {
            console.log("destroy", error, callback);

            if (callback) {
                callback();
            }
        }
    });
}

const App = () => {
    const correctArgs = process.argv.slice(2);

    if (!correctArgs.some((arg) => configOptions.includes(arg))) {
        process.stderr.write("Invalid config received \n");

        process.kill(process.pid, 4);

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

// const net = require("net");
// const server = net.createServer((connection) => {
//     const readStr = new Readable();
//
//     readStr._read(10);
//
//     console.log("READ STR", readStr);
//     console.log("client connected");
//
//     connection.on('end', () => {
//         console.log("client disconnected");
//     });
//
//     // connection.write("hello\r\n");
//     // connection.pipe(connection);
// });
// // tcp, unix-socket
// console.log("stdout", process.stdin);
// server.listen(8010, "0.0.0.0", () => {console.log("started");});


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

// const http = require('http');
//
// const server = http.createServer((req, res) => {
//     console.log("start");
//     // `req` is an http.IncomingMessage, which is a readable stream.
//     // `res` is an http.ServerResponse, which is a writable stream.
//
//     let body = '';
//
//     console.log("body", body);
//     // Get the data as utf8 strings.
//     // If an encoding is not set, Buffer objects will be received.
//     req.setEncoding('utf8');
//
//     // Readable streams emit 'data' events once a listener is added.
//     req.on('data', (chunk) => {
//         console.log(req, res, chunk);
//         body += chunk;
//     });
//
//     // The 'end' event indicates that the entire body has been received.
//     req.on('end', () => {
//         try {
//             const data = JSON.parse(body);
//             // Write back something interesting to the user:
//             res.write(typeof data);
//             res.end();
//         } catch (er) {
//             // uh oh! bad json!
//             res.statusCode = 400;
//             return res.end(`error: ${er.message}`);
//         }
//     });
// });
//
// server.listen(1337);