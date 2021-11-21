const utils = require("../utils");

const processArgv = process.argv;

describe("getCorrectArgs function test", () => {
    beforeEach(() => {
       jest.resetModules();

       process.argv = ["node", "./src/index.js", "-c", "C1-C1-A"];
    });

    afterEach(() => {
        process.argv = processArgv;
    });

    it("should return correct array of values", () => {
        expect(utils.getCorrectArgs()).toEqual(["-c", "C1-C1-A"]);
    });
});
