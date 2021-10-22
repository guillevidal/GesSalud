const { Router } = require("express");
const rutasProtegidas = Router();
const jwt = require("jsonwebtoken");
const config = require("../../configs/config.js");

rutasProtegidas.use((req, res, next) => {
const token = req.headers.accept;
if (token) {
    jwt.verify(token, config.masterKeyGesSalud, (err, decoded) => {
    if (err) {
        return res.json({ mensaje: "Token inválida" });
    } else {
        req.decoded = decoded;
        next();
    }
    });
} else {
    res.send({
    mensaje: "Token no proveída.",
    });
}
});

module.exports = rutasProtegidas;