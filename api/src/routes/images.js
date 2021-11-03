const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { Persona } = require("../db");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    // const dirname = path.resolve();
    // const dir = path.join(dirname, "uploads");
    cb(null, ""); //en null se podria manejar el error
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + ".jpg");
  },
});

const uploads = multer({ storage });

router.post("/", uploads.single("image"), async (req, res) => {
  // const image = req.file.path;

  //ALMACENAMIENTO EN LA BD
  const dni = req.file.originalname.split("-")[0];
  // const fileName = req.file.originalname + ".jpg";
  let fileName = req.file.buffer;
  try {
    await Persona.update(
      {
        imgProfile: fileName,
      },
      {
        where: { dni: dni },
      }
    );
    res.json({ msg: "Successful upload" });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

//PARA EXTRAER LA IMAGEN DESDE EL DISKSTORAGE
router.get("/profile/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    let query = await Persona.findOne({
      where: { dni: dni },
      attributes: ["imgProfile"],
    });
    res.contentType("image/jpeg");
    return res.send(query.dataValues.imgProfile);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

module.exports = router;
