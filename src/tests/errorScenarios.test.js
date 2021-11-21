const App = require("../app/app");

const duplicatedConfigArgumentsInput = ["-c", "C1-C1-A-R0", "-c", "C0", "-i", "./src/input.txt", "-o", "./src/output.txt"];

const configWithoutInputFile = ["-c", "C1-C1-A-R0", "-i", "./src/wqdasdcasf.txt", "-o", "./src/output.txt"];

const configWithIncorrectOutputPath = ["-c", "C1-C1-A-R0", "-o", "./src/wqdasdcasf.txt", "-i", "./src/input.txt"];

const mockCorrectArgs = jest.fn();

jest.mock("../utils", () => {

  return {
    ...jest.requireActual("../utils"),
    getCorrectArgs: () => mockCorrectArgs(),
  };
});

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
const mockStderr = jest.spyOn(process.stderr, "write").mockImplementation(() => {});

describe("Error scenarios tests for task 2", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it("Should throw error when passing cli arguments twice", async() => {
    mockCorrectArgs.mockImplementationOnce(() => duplicatedConfigArgumentsInput);
    await App.App();

    expect(mockExit).toBeCalled();
    expect(mockExit.mock.calls[0][0]).toBe(1);
    expect(mockStderr).toBeCalled();
    expect(mockStderr.mock.calls[0][0]).toBe("DuplicatedOptionsError: Options duplicated\n");
  });

  it("Should throw error when user passes -i argument with path that doesn't exist or with no read access", async() => {
    mockCorrectArgs.mockImplementationOnce(() => configWithoutInputFile)
    await App.App();

    expect(mockStderr).toBeCalled();
    expect(mockStderr.mock.calls[0][0]).toBe("InvalidInputError: Cannot get access to input file");
    expect(mockExit).toBeCalled();
    expect(mockExit.mock.calls[0][0]).toBe(1);
  });

  it("Should throw error when user passes -o argument with path that doesn't exist or with no write access", async() => {
    mockCorrectArgs.mockImplementationOnce(() => configWithIncorrectOutputPath)
    await App.App();

    expect(mockStderr).toBeCalled();
    expect(mockStderr.mock.calls[0][0]).toBe("InvalidOutputError: Cannot get access to output file");
    expect(mockExit).toBeCalled();
    expect(mockExit.mock.calls[0][0]).toBe(1);
  });
});
