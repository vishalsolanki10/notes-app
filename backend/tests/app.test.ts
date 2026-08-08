import request from "supertest";
import app from "../src/app";

describe("App", () => {
  it("should return 404 for unknown route", async () => {
    const response = await request(app)
      .get("/unknown-route");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      success: false,
      message: "Route not found",
    });
  });
});