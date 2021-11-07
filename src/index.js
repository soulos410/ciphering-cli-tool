const {configOptions, validOptions} = require("./constants");
const {checkDuplicates} = require("./utils/checkDuplicates");
const {getTransformStreamsList} = require("./utils/getTransformSteamsList");
const {OutputStream} = require("./streams/writable/OutputStream");
const {createFileReadableStream} = require("./streams/readable/createFileReadableStream");
const {createFileWritableStream} = require("./streams/writable/FileWritableStream");
const {createTransformStream} = require("./utils/createTransformStream");

const App = () => {
    const correctArgs = process.argv.slice(2);

    if (!correctArgs.some((arg) => configOptions.includes(arg))) {
        process.stderr.write("Invalid config received \n");

        process.exit(1);
    }
    const configKeys = correctArgs.filter((option, index) => index % 2 === 0);

    checkDuplicates(configKeys);

    const configValues = correctArgs.filter((option, index) => index % 2 !== 0);

    const configOptionsMap = configKeys.reduce((acc, optionKey, index) => {
        const key = Object.keys(validOptions).find((key) => {
            return validOptions[key].includes(optionKey);
        })

        return ({
            ...acc,
            [key]: configValues[index],
        });
    }, {});

    const transformsList = getTransformStreamsList(configOptionsMap.config);

    if (configOptionsMap.input) {
        const fileReadStream = createFileReadableStream(configOptionsMap.input, "utf8");

        if (configOptionsMap.output) {
            const fileOutputStream = createFileWritableStream(configOptionsMap.output, "utf8");
            const stream = createTransformStream(transformsList, fileReadStream);

            stream.pipe(fileOutputStream);
        } else {
            const writableStream = new OutputStream();
            const stream = createTransformStream(transformsList, fileReadStream);

            process.stdin.setMaxListeners(100);

            stream.pipe(writableStream);
        }
    } else {
        if (configOptionsMap.output) {
            const writableStream = createFileWritableStream(configOptionsMap.output, {encoding: "utf8", flags: "r+"});
            const stream = createTransformStream(transformsList, process.stdin);

            stream.pipe(writableStream);
        } else {
            const writableStream = new OutputStream();
            const stream = createTransformStream(transformsList, process.stdin);

            process.stdin.setMaxListeners(100);

            process.on("SIGINT", () => {
                writableStream._final();
            });

            stream.pipe(writableStream);
        }
    }
};

App();
