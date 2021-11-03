const { Router } = require("express");
const { Mensajes } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
  try {
    let savedMessage = await Mensajes.create(
      {
        sender: req.body.sender,
        conversationId: req.body.conversationId,
        text: req.body.text,
      },
      { fields: ["sender", "conversationId", "text"] }
    );
    res.status(201).send(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "No pudimos crear el Mensaje" });
  }
});

router.get("/:conversationId", async function (req, res) {
  let { conversationId } = req.params;
  try {
    let allMessages = await Mensajes.findAll({
      where: { conversationId: conversationId },
    });
    res.status(200).send(allMessages);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "no se pudo encontrar los mensajes de la Conversacion" });
  }
});

module.exports = router;
