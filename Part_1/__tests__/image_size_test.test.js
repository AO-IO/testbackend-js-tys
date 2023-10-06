// __tests__/app.test.js
const request = require('supertest');
const app = require('../api/index');


describe("POST /add-post", () => {
  it("main image size should be more than 1mb", async () => {
    const requestBody = {
    
        title: "Test Blog Post",
        description: "This is a test blog post.",
        date_time: Math.floor(Date.now() / 1000)
      };
      
      const response = await request(app)
        .post("/add-post")
        .attach('main_image', './images/sumia_pass.jpg') 
        .field(requestBody)
        .expect(400);
        expect(response.body).toHaveProperty("error", "File too large");

  });
});





