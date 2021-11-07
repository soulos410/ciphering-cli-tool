const {configOptions} = require("../constants");

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

        process.exit(1);
    }
};

module.exports = { checkDuplicates };
