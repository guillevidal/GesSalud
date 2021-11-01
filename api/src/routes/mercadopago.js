const axios = require("axios");
const { Router } = require("express");
//const { transporter } = require("../configs/nodemailer");

const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const historial_pagos = require("../models/historial_pagos");
const { Historial_pagos, Items_pagos } = require("../db");
const items_pagos = require("../models/items_pagos");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-1036676948843093-103000-03b2fdd1a27093603c20d8ef93bd87bb-1009396366",
});

router.get("/", function (req, res) {
  let servicios = req.body;

  let preference = {
    ...servicios,
    back_urls: {
      success: "https://ges-salud.vercel.app/patientPys",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
  };

  console.log(preference);

  if (preference) {
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        // global.id = response.body.id;
        //console.log(mercadopago.preferences);
        //res.redirect(response.body.init_point);
        console.log(response.body.init_point);
        res.redirect(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

let arrelgo = [];
let arreglo2 = [];

router.post("/", async function (req, res) {
  let { id, topic } = req.query;
  try {
    let info = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          Authorization:
            "Bearer APP_USR-1036676948843093-103000-03b2fdd1a27093603c20d8ef93bd87bb-1009396366",
        },
      }
    );
    arreglo2.push(info.data);
    let { additional_info, status_detail, transaction_amount } = info.data;
    let arrayTest2 = await Historial_pagos.create({
      id: info.data.id,
      status: status_detail,
      price: transaction_amount,
    });

    let arrayTest = additional_info.items.map(async (e) => {
      await Items_pagos.create(
        {
          title: e.title,
          unit_price: e.unit_price,
          patient_id: e.category_id,
          historialPagoId: info.data.id,
        },
        {
          fields: ["title", "unit_price", "patient_id"],
        }
      );
    });
    arreglo2.push(arrayTest2.dataValues);
    arrelgo.push(arrayTest.dataValues);

    res.sendStatus(200);
  } catch (err) {
    res.status(400);
  }
});

router.get("/array", function (req, res) {
  res.status(200).send({ arrelgo, arreglo2 });
});

module.exports = router;
