const request = require("supertest");
const app = require("../api/index");
describe("POST /add-post", () => {
  it("should add an invalid blog post with missing required fields", async () => {
    const requestBody = {
      date_time: Math.floor(Date.now() / 1000),
      description: "test test test test test eeast",
    };

    const response = await request(app)
      .post("/add-post")
      .attach("main_image", "./images/me.jpeg")
      .field(requestBody)
      .expect(400);

    expect(response.body).toHaveProperty("errors");

    const errors = response.body.errors;
    expect(errors).toEqual([
      { field: "title", message: "Title is required" },
      { field: "title", message: "Must be between 5 and 50 characters" },
      { field: "title", message: "No special characters allowed" },
    ]);
  });
});
