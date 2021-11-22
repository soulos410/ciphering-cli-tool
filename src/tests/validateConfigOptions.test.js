const validator = require("../utils/validateConfigOptions");

describe("validate config options test", () => {
  it("should return undefined because of valid config", () =>
    expect(() =>
      validator.validateConfigOptions({ config: "C1-C0-A"})
    ).not.toThrow()
  );

  it("should return custom error because of invalid config", () => {
    expect(() =>
      validator.validateConfigOptions({config: "c1-c0"})
    ).toThrow("Invalid config received. Check case of your config options");
  });
});
