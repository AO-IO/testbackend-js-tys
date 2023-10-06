const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const TokenMiddleware = require("../middleware/token");

router.get("/image/:image", TokenMiddleware, (req, res, next) => {
  const imagePathToFind = req.params.image;
  const imagesFolder = "./images/";

  const imageFullPath = path.join(imagesFolder, imagePathToFind);

  fs.access(imageFullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("Image not found.");
      return res.status(404).json({ message: "Not found" });
    } else {
      const imagePath = path.resolve(imageFullPath);
      res.sendFile(imagePath);
    }
  });
});

router.get("/getToken/:imageName", async (req, res, next) => {
  const token = await jwt.sign(
    { image_path: req.params.imageName },
    process.env.SECERT_WORD_JWT_TOKEN,
    { expiresIn: `200m` }
  );
  if (token) {
    return res.status(200).json({ token: token });
  } else {
    return res.status(400).json("You are not allowed");
  }
});

module.exports = router;
