const request = require('supertest');
const app = require('../api/index');

describe("POST /add-post GET /posts", () => {
  it("should add an invalid blog post, retrieve all blog posts, and check if the added blog post was not added", async () => {
    const requestBody = {
    };
    const response = await request(app)
      .post("/add-post")
      .attach('main_image', './images/me.jpeg')
      .field(requestBody)
      .expect(400); 

      expect(response.body).toHaveProperty("errors");
      const checkIfInvalidPostIsInPosts = response.body.posts
      const errors = response.body.errors;
      expect(errors).toEqual([
        { field: "title", message: "Title is required" },
        { field: "title", message: "Must be between 5 and 50 characters" },
        {field:"title",message:"No special characters allowed"},
        { field: "description", message: "Description is required" },
        { field: "description", message: "Must be between 5 and 50 characters" },
        {field:"date_time",message:"Date and time are required"},
        {field:"date_time",message:"Time should be a Unix timestamp and not before the current time"}
      ]);
    // expect(response.body).not.toHaveProperty('newPost')
 
    const getAllPosts = await request(app)
    .get("/posts")
    .expect(200);

    const invalidPostExist = getAllPosts.body.some((post) => {
        return (
          post.title === requestBody.title &&
          post.description === requestBody.description &&
          post.date_time === requestBody.date_time
        );
      });
      
    expect(invalidPostExist).toBe(false)
    
  });
});
