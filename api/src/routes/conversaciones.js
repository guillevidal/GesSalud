const { Router } = require("express");
const { Op } = require("sequelize");
const { Conversacion } = require("../db");

const router = Router();

router.post("/", async function (req, res) {
  let { senderId, receiverId } = req.body;
  try {
    let savedConversation = await Conversacion.create(
      {
        senderId,
        receiverId,
      },
      { fields: ["senderId", "receiverId"] }
    );
    res.status(201).send(savedConversation);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "no pudimos crear la conversacion" });
  }
});

router.get("/:userId", async function (req, res) {
  let { userId } = req.params;
  try {
    let queryConversationById = await Conversacion.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    res.send(queryConversationById);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "No pudimos encontrar la Conversacion" });
  }
});
module.exports = router;
