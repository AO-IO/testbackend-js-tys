const express = require("express");
const router = express.Router();
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const moment = require("moment");
const _ = require("lodash");

const storageMainImage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    const uniqueFilename = uniqueSuffix + extname;
    req.uniqueFilename = uniqueFilename;
    cb(null, uniqueFilename);
  },
});

const uploadMainImage = multer({
  storage: storageMainImage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error("Only JPG images are allowed"));
    }
    cb(null, true);
  },
}).fields([
  { name: "main_image", maxCount: 1 },
  { name: "add_images", maxCount: 5 },
]);

router.get("/posts", (req, res, next) => {
  const filePath = "./blogs.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }
    const jsonData = JSON.parse(data);

    const newMap = jsonData.map((post) => {
      return {
        title: post.title,
        description: post.description,
        date: moment.unix(post.date_time),
        image: post.main_image,
        additionalImages: post.additional_images,
        slug: _.kebabCase(post.title),
      };
    });
    res.status(200).json(newMap);
  });
});

router.post("/add-post", (req, res, next) => {
  uploadMainImage(req, res, async (mainImageErr) => {
    await body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5, max: 50 })
      .withMessage("Must be between 5 and 50 characters")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("No special characters allowed")
      .run(req);
    await body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 5, max: 50 })
      .withMessage("Must be between 5 and 50 characters")
      .run(req);
      await body("date_time")
    .notEmpty()
    .withMessage("Date and time are required")
    .isInt({ min: Math.floor(Date.now() / 1000) })
    .withMessage("Time should be a Unix timestamp and not before the current time").run(req)
      await body('main_image')
      .custom((value, { req }) => {
        // console.log(req.files.main_image)
        if (!req.files || !req.files.main_image) {
          throw new Error('Main image is required.');
        }
  
        
  
        return true;
      }).run(req)
    const InputErrors = validationResult(req);
    // console.log(req.files);
    if (mainImageErr) {
      // console.log(mainImageErr)
      return res.status(400).json({ error: mainImageErr ? mainImageErr.message : "Main image upload failed" });
    } else if (!InputErrors.isEmpty()) {
      if (req.files) {
        Object.keys(req.files).forEach((fieldName) => {
          const fieldFiles = req.files[fieldName];
          if (Array.isArray(fieldFiles)) {
            fieldFiles.forEach((file) => {
              const filePath = file.path;
              if (fs.existsSync(filePath)) {
                fs.rmSync(filePath);
              }
            });
          }
        });
      }
      // console.log(req.files['add_images'])
      // console.log(req.files['add_images'][0].filename)

      return res.status(400).json({
        errors: InputErrors.array().map((err) => {
          return {
            field: err.path,
            message: err.msg,
          };
        }),
      });
    }

    const filePath = "./blogs.json";
    const titleInput = req.body.title;
    const descriptionInput = req.body.description;
    const dateInput = req.body.date_time;
    const mainImage = req.files["main_image"][0];
    const additionalImages = req.files["add_images"];
    fs.readFile(filePath, "utf8", async (err, data) => {
      if (err) {
        // console.error(err);
        return res.status(500).send("Error reading JSON file");
      }

      let additionalImagesPaths = [];

      if (additionalImages && Array.isArray(additionalImages)) {
        additionalImagesPaths = additionalImages.map((file) => {
          return "/images/" + file.filename;
        });
      }
      const jsonData = JSON.parse(data);
      const maxID = jsonData.reduce((max, record) => {
        const id = parseInt(record.reference, 10);
        return id > max ? id : max;
      }, 0);

      const nextID = (maxID + 1).toString().padStart(5, "0");
      const nowCompare = Math.floor(Date.now() / 1000);
      const now = new Date();
      const unixTimestamp = Math.floor(now.getTime() / 1000);
      const newPost = {
        reference: nextID,
        title: titleInput,
        description: descriptionInput,
        main_image: `images/${nextID}${req.uniqueFilename}`,
        additional_images: additionalImagesPaths,
        date_time: dateInput // remove to make the test success
        // unixTimestamp >= nowCompare ? unixTimestamp : nowCompare
      };

      const compressionPercentage = 25;

      sharp(mainImage.path)
        .resize({ percentage: 100 - compressionPercentage })
        .jpeg({ quality: 50 })
        .toFile(
          `./images/${req.uniqueFilename.filename}`,
          async (err, info) => {
            if (err) {
              // console.error(err);
              return res
                .status(500)
                .json({ error: "Image compression failed" });
            }
          }
        );
      if (additionalImages && Array.isArray(additionalImages)) {
        const compressAndReplaceImage = async (file) => {
          const compressedImagePath = `./images/compressed_${file.filename}`;

          await sharp(file.path)
            .resize({ percentage: 100 - compressionPercentage })
            .jpeg({ quality: 50 })
            .toFile(compressedImagePath);

          await fs.unlink(file.path);

          await fs.rename(compressedImagePath, `./images/${file.filename}`);

          return `./images/${file.filename}`;
        };
      }
      jsonData.push(newPost);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing to JSON file");
        }

        res.json({ message: "Record added successfully", newPost:newPost });
      });
    });
  });
});

module.exports = router;
