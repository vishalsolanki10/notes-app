import request from "supertest";
import app from "../src/app";

describe("Health API", () => {
  it("should return server health status", async () => {
    const response = await request(app)
      .get("/api/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Server is running",
    });
  });
});