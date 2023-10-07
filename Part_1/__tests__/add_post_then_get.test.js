const request = require('supertest');
const app = require('../api/index');

describe("POST /add-post GET /posts", () => {
  it("should add a post, retrieve all posts, and check if the post is present", async () => {
    const requestBody = {
      title: "Test Blog Post",
      description: "This is a test blog post.",
      date_time: Math.floor(Date.now() / 1000),
    };
    const addPostResponse = await request(app)
      .post("/add-post")
      .attach('main_image', './images/me.jpeg')
      .field(requestBody)
      .expect(200);

    expect(addPostResponse.body).toHaveProperty("message", "Record added successfully");
    expect(addPostResponse.body).toHaveProperty("newPost");

    const getAllPosts = await request(app)
      .get("/posts")
      .expect(200);

    const newlyAddedPost = addPostResponse.body.newPost;
    const postlist = getAllPosts.body;

    const isAddedPostExist = postlist.some((post) => post._id === newlyAddedPost._id);
    expect(isAddedPostExist).toBe(true);
  });
});
