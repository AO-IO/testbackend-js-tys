
const request = require('supertest');
const app = require('../api/index');


describe("POST /add-post", () => {
  it("title have a special keyword", async () => {
    const requestBody = {
    
        title: "Test Blog Post $",
        description: "This is a test blog post.",
        date_time: Math.floor(Date.now() / 1000)
      };
      
      const response = await request(app)
        .post("/add-post")
        .attach('main_image', './images/me.jpeg') 
        .field(requestBody)
        .expect(400);

        expect(response.body).toHaveProperty("errors");
  
        const errors = response.body.errors;
        expect(errors).toEqual([
          {field:"title",message:"No special characters allowed"}

        ]);
  });
});





