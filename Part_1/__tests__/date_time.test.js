
const request = require('supertest');
const app = require('../api/index');


describe("POST /add-post", () => {
  it("date time should be unix", async () => {
    const now = new Date();
const isoString = now.toISOString();

    const requestBody = {
    
        title: "Test Blog Post ",
        description: "This is a test blog post.",
        date_time: isoString
      };
      
      const response = await request(app)
        .post("/add-post")
        .attach('main_image', './images/me.jpeg') 
        .field(requestBody)
        .expect(400);

        expect(response.body).toHaveProperty("errors");
  
        const errors = response.body.errors;
        expect(errors).toEqual([
          {field:"date_time",message:"Time should be a Unix timestamp and not before the current time"}
        ]);
  });
});





