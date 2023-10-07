const request = require("supertest");
const app = require("../api/index");

describe("GET /getToken/:image GET /image/:image", () => {
  it("date time should be unix", async () => {
    /// get token

    const requestBody = {
      main_image: "1696628556309-274166409.jpeg",
      picture2: "1696628556364-491540699.jpeg",
    };
    const response = await request(app)
      .get("/getToken/" + requestBody.main_image)
      .expect(200);

    expect(response.body).toHaveProperty("token");

    const token = response.body.token;

    // view image

    const viewImage = await request(app)
      .get("/image/" + requestBody.main_image)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    // generate token for second image
    const response2 = await request(app)
      .get("/getToken/" + requestBody.picture2)
      .expect(200);
    expect(response.body).toHaveProperty("token");

    const token2 = response2.body.token;

    const ViewFirstImageWithtoken2 = await request(app)
      .get("/image/" + requestBody.main_image)
      .set("Authorization", `Bearer ${token2}`)
      .expect(403);

    expect(ViewFirstImageWithtoken2.body).toHaveProperty(
      "message",
      "Invalid token, are you sure its valid?"
    );
  });
});
