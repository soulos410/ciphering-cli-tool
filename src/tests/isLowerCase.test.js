const {isLowercaseLetter} = require("../utils/isLowerCase");

describe('isLowerCase function check', () => {
  it("should return true", async () => {
    const result = isLowercaseLetter("c");

    await expect(result).toBeTruthy();
  });

  it("should return false", async () => {
    const result = isLowercaseLetter("C");

    await expect(result).toBeFalsy();
  })
});