const customErrorsHandler = (error) => {
  const { systemError } = error;

  if (systemError) {
    throw error;
  } else {
    process.stderr.write(`${error.errorName}: ${error.message}`);

    process.exit(1);
  }
};

module.exports = { customErrorsHandler };
