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

router.post("/pago", function (req, res) {
  let servicios = req.body;
  console.log(servicios)
  let preference = {
    ...servicios,
    back_urls: {
      success: "https://ges-salud.vercel.app/turnoPys",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
  };

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

    let { additional_info, status_detail, transaction_amount } = info.data;

    let historialPagos = await Historial_pagos.create(
      {
        id: info.data.id,
        status: status_detail,
        price: transaction_amount,
      },
      {
        fields: ["id", "status", "price"],
      }
    );

    let ItemsPagos = additional_info.items.map(async (e) => {
      let itemPagos = await Items_pagos.create(
        {
          title: e.title,
          unit_price: Number(e.unit_price),
          patient_id: Number(e.id),
          turno_id: Number(e.category_id),
          historialPagoId: Number(info.data.id),
        },
        {
          fields: [
            "title",
            "unit_price",
            "patient_id",
            "historialPagoId",
            "turno_id",
          ],
        }
      );
      //itemPagos.setHistorial_pagos()
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(400);
  }
});

router.get("/:id", async function (req, res) {
  let { id } = req.params;
  try {
    let busquedaPagoPorId = await Items_pagos.findOne(
      { where: { patient_id: id } },
      { include: Historial_pagos }
    );
    res.send(busquedaPagoPorId);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "no pudimos encontrar la informacion" });
  }
});

module.exports = router;
