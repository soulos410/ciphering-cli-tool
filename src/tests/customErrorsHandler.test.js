const {customErrorsHandler} = require("../utils/customErrorsHandler");
const {CustomError} = require("../errors/CustomError");

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

describe("custom errors handler test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should throw system error", () => {
    expect(() =>
      customErrorsHandler(new SyntaxError())
    ).toThrow(SyntaxError);
  });

  it("should throw custom error", () => {
    customErrorsHandler(new CustomError("Mocked custom error", "error"));

    expect(mockExit).toHaveBeenCalled();
    expect(mockExit.mock.calls[0][0]).toBe(1);
  })
});
