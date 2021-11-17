const { checkDuplicates } = require("../utils/checkDuplicates");

describe("checkDuplicates helper function", () => {
  it("should return undefined", async () => {
    await expect(checkDuplicates(["-c", "-i", "-o"])).toBeUndefined();
  });

  it("should throw duplicated options error", async () => {
    await expect(() => {
      checkDuplicates(["-c", "--config"]);
    }).toThrow("Options duplicated");
  });
});