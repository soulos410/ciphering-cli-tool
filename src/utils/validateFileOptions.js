const validateFilesOptions = (configOptionsMap) => {
    if (!configOptionsMap.input || !configOptionsMap.output) {
        process.stderr.write("Invalid ")
    }
}

module.exports = { validateFilesOptions };
