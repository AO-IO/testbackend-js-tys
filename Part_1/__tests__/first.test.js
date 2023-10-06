
const request = require('supertest');
const app = require('../api/index');


describe("POST /add-post", () => {
  it("should add a valid blog post with all fields", async () => {
    const requestBody = {
    
        title: "Test Blog Post",
        description: "This is a test blog post.",
        date_time: Math.floor(Date.now() / 1000)
      };
      
      const response = await request(app)
        .post("/add-post")
        .attach('main_image', './images/me.jpeg') 
        .field(requestBody)
        .expect(200);

    expect(response.body).toHaveProperty("message", "Record added successfully");
    expect(response.body).toHaveProperty("newPost");

    const newPost = response.body.newPost;
    expect(newPost.title).toBe(requestBody.title);
    expect(newPost.description).toBe(requestBody.description);
  });
});





