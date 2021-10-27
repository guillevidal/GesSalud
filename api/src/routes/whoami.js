const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("../configs/config");
// const { Persona } = require("../db");

router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.masterKeyGesSalud, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        res.status(200).json(decoded.data);
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

module.exports = router;
