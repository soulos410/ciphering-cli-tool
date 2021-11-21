const { Writable } = require("stream");
const App = require("../app/app");

const correctConfigInput = ["-c", "C1-C1-A-R0", "-i", "./src/input.txt", "-o", "./src/output.txt"];

const firstCorrectInput = ["-c", "C1-C1-R0-A", "-i", "./src/input.txt", "-o", "./src/output.txt"];

const mockWritableFinal = jest.fn();

class MockedWritable extends Writable {
    constructor(args) {
        super(args);

        this.output = "";
    }

    _write(chunk, encoding, callback) {
        this.output += chunk.toString();

        callback();
    }

    _final(callback) {
        mockWritableFinal(this.output);
        
        callback()
    }
}

const mockCorrectArgs = jest.fn();

jest.mock("../streams/writable/FileWritableStream", () => ({
    createFileWritableStream: () => Promise.resolve(new MockedWritable()),
}));

jest.mock("../utils", () => {

    return {
        ...jest.requireActual("../utils"),
        getCorrectArgs: () => mockCorrectArgs(),
    };
});

describe("Success scenarios tests for task 2", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterAll(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    it("Should pass test when user enter correct arguments", async () => {
        mockCorrectArgs.mockReturnValueOnce(correctConfigInput);

        await expect(App.App()).resolves.toBeUndefined();
    });

    it("Should not throw error and result should be equal inline snapshot", async () => {
        mockCorrectArgs.mockReturnValueOnce(firstCorrectInput);

        await App.App();

        expect(mockWritableFinal).toBeCalled();
        expect(mockWritableFinal.mock.calls[0][0]).toMatchInlineSnapshot(`"Myxn xn nbdobm. Tbnnfzb ferlm \\"_\\" nhteru!"`);
    });
});
