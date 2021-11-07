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

const validOptionsKeys = {
    config: "config",
    input: "input",
    output: "output",
};

const validOptions = {
    [validOptionsKeys.config]: configOptions,
    [validOptionsKeys.input]: inputOptions,
    [validOptionsKeys.output]: outputOptions,
};

module.exports = {
    validOptionsKeys,
    alphabet,
    configOptions,
    inputOptions,
    outputOptions,
    validOptions,
};
