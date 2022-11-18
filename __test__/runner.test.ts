process.env.MONGODB_CONNECTION_STRING = "true";
import { runner } from "../src/runner";

describe("runner.ts", () => {
  test("should run", async () => {
    const response = await runner();
    expect(response.body).not.toBeNull();
  });
});
