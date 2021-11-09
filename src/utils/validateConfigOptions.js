const validateConfigOptions = (configOptionsMap) => {
  const hasInvalidConfig = configOptionsMap.config.split("-").some(([option]) => option.toUpperCase() !== option);

  if (hasInvalidConfig) {
    process.stderr.write("Error: Invalid config received. Check case of your config options \n");

    process.exit(1);
  }
}


  module.exports = { validateConfigOptions };
