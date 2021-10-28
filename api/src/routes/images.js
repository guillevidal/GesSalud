const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); //en null se podria manejar el error
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
console.log("storage", storage);
const uploads = multer({ storage });

router.get("/", (req, res) => {
  const uploadsDirectory = path.join("uploads");

  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      return res.json({ msg: err });
    }
    if (files.length === 0) {
      return res.json({ msg: "No images uploaded" });
    }

    return res.json({ files });
  });
});

router.post("/", uploads.single("image"), (req, res) => {
  const image = req.file.path;
  console.log("req.file", req.file);
  console.log("req.file original name", req.file.originalname);
  console.log("image", image);
  res.json({ msg: "Image successfully created" });
});

module.exports = router;