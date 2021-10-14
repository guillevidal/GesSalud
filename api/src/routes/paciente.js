const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");




router.get("/", async function (req, res, next) {

res.send("hola juan carlos")
})


module.exports = router;

