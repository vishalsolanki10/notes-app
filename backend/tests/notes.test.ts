import request from "supertest";
import app from "../src/app";

describe("Notes API", () => {
  it("should return notes list", async () => {
    const response = await request(app)
      .get("/api/notes");

    expect(response.status).toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body).toHaveProperty(
      "data"
    );

    expect(response.body).toHaveProperty(
      "pagination"
    );

    expect(
      Array.isArray(response.body.data)
    ).toBe(true);
  });
});