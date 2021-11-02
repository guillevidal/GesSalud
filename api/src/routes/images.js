const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { Persona } = require("../db");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.BASE_URL + "uploads"); //en null se podria manejar el error
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + ".jpg");
  },
});

const uploads = multer({ storage });

// router.get("/", (req, res) => {
//   const uploadsDirectory = path.join("uploads");

//   fs.readdir(uploadsDirectory, (err, files) => {
//     if (err) {
//       return res.json({ msg: err });
//     }
//     if (files.length === 0) {
//       return res.json({ msg: "No images uploaded" });
//     }

//     return res.json({ files });
//   });
// });

router.post("/", uploads.single("image"), async (req, res) => {
  const image = req.file.path;

  //ALMACENAMIENTO EN LA BD
  const dni = req.file.originalname.split("-")[0];
  const fileName = req.file.originalname + ".jpg";

  await Persona.update(
    {
      imgProfile: fileName,
    },
    {
      where: { dni: dni },
    }
  );

  console.log("###### DNIIIIIII ######", dni);
  console.log("req.file", req.file);
  console.log("req.file original name", req.file.originalname);
  console.log("image", image);
  res.json({ msg: "Image successfully created" });
});

//PARA EXTRAER LA IMAGEN DESDE EL DISKSTORAGE
router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  try {
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, "uploads/" + filename);
    return res.sendFile(fullfilepath);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

module.exports = router;
