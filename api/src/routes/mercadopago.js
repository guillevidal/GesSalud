const { Router } = require("express");
//const { transporter } = require("../configs/nodemailer");
//const db = require("../db");
// const { } = require("../db");
const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-1036676948843093-103000-03b2fdd1a27093603c20d8ef93bd87bb-1009396366",
});

router.get("/", function (req, res) {
  let preference = req.body;
  console.log(preference);
  // Crea un objeto de preferencia
  // let preference = {
  //   items: [
  //     {
  //       title,
  //       unit_price,
  //       quantity,
  //     },

  //   ],
  // };
  if (preference) {
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        // global.id = response.body.id;

        res.redirect(response.body.init_point);
        console.log(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

module.exports = router;
