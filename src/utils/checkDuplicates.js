const {configOptions} = require("../constants");
const {customErrorsHandler} = require("./customErrorsHandler");
const {CustomError} = require("../errors/CustomError");

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

    try {
        if (configKeysCount > 1) {
            throw new CustomError("Options duplicated\n", "DuplicatedOptionsError");
        }
    } catch(e) {
        customErrorsHandler(e);
    }
};

module.exports = { checkDuplicates };
