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
 * Letter case check function
 * @param letter: string
 * @return boolean
 */
const isLowercaseLetter = (letter) =>
    letter.toLowerCase() === letter;

const transformByAtbash = (inputString) => {
    const alphabetLength = alphabet.length;

    return inputString
        .split("")
        .map((letter) => {
          if(!alphabet.includes(letter.toLowerCase())) {
            return letter;
          }

          return isLowercaseLetter(letter)
            ? alphabet[alphabetLength - (alphabet.indexOf(letter) + 1)]
            : alphabet[alphabetLength - (alphabet.indexOf(letter.toLowerCase()) + 1)].toUpperCase()
          }
        )
        .join("");
}

/**
 * Caesar cypher transform function
 * @param isEncode: boolean
 * @param inputString: string
 * @param shift: number
 * @return string
 */
const transformByCaesar = (isEncode, inputString, shift) => {
    const alphabetLength = alphabet.length;

    if (isEncode) {
        return inputString
            .split("")
            .map((letter) => {
                 if(!alphabet.includes(letter.toLowerCase())) {
                     return letter;
                 }

                 // todo trouble with "z" letter. alphabet[(alphabet.indexOf("z")] is 25,  25 + shift = 26. alphabet[26] undefined. need to add check -> alphabet[(alphabet.indexOf("z") + 1) % 26]
                 // return isLowercaseLetter(letter)
                 //     ? alphabet[(alphabet.indexOf(letter) + shift) % alphabetLength]
                 //     : alphabet[(alphabet.indexOf(letter.toLowerCase()) + shift) % alphabetLength]
                 //         .toUpperCase()
                }
            )
            .join("")
    } else {
        return inputString
            .split("")
            .map((letter) => {
              if (!alphabet.includes(letter.toLowerCase())) {
                return letter;
              }
              return isLowercaseLetter(letter)
                ? alphabet[(alphabet.indexOf(letter) - shift) % alphabetLength]
                : alphabet[(alphabet.indexOf(letter.toLowerCase()) - shift) % alphabetLength]
                  .toUpperCase()
              }
            )
            .join("")
    }
};

/**
 * type AlgorithmType = "C" | "R" | "A"
 * @param currentConfig: Array<{ {X: AlgorithmType, Y: 1 | 0} }>
 * @param inputString: string
 * @return string
 */
const getAlgorithmToTransform = (currentConfig, inputString) => {
    switch (currentConfig[0]) {
        case "C": {
            return transformByCaesar(!!parseInt(currentConfig[1], 10), inputString, 1);
        }
        case "A": {
            return transformByAtbash(inputString);
        }
        case "R": {
            return transformByCaesar(!!parseInt(currentConfig[1], 10), inputString, 8);
        }
    }
}

/**
 * Transform stream for stdin input transform
 */
class TransformByConfig extends Transform {
    constructor(config) {
        super();

        this.config = config;
    }

    push(chunk, encoding) {
        return super.push(chunk, encoding);
    }

    _transform(chunk, encoding, callback) {
        let result = Buffer.from(chunk).toString().trim();

        this.config.forEach((config) => {
            result = getAlgorithmToTransform(config, result);

            console.log("result", result);
            }
        );

        this.push(result);

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

        // todo if callback is not called, returned value is first input string, is it correct behaviour
        callback();
    }

    _final(callback) {
        process.stdout.write(`\n${this.#input}\n`);

        process.exit(0);
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

    process.on("SIGINT", () => {
        writableStream._final();
    });

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
