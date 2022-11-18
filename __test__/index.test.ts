import { runner } from "../src/runner";
import { handler } from "../src/index";

jest.mock("../src/runner.ts", () => ({
  runner: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("index tests", () => {
  it("should invoke the runner once.", async () => {
    await handler();
    expect(runner).toHaveBeenCalledTimes(1);
  });
});
