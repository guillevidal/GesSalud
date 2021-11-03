const { Router } = require("express");
const { Persona } = require("../db");
const { transporter } = require("../configs/nodemailer");

const router = Router();

router.put("/", async function (req, res) {
  const [yaExisteCorreo] = await Promise.all([
    Persona.findOne({ where: { email: req.body.email } }),
  ]);
  try {
    if (!yaExisteCorreo) {
      res.status(400).send({ msg: "Los datos aportados no son correctos" });
    } else {
      let numeroAleatorio = Math.floor(Math.random() * 100000);
      let correoCortado = req.body.user.split("@")[0];
      let nuevaContraseña = (correoCortado + numeroAleatorio).toString();
      await Persona.update(
        { password: nuevaContraseña },
        { where: { email: req.body.email } }
      );
      if (req.body.email) {
        await transporter.sendMail({
          from: '"GesSalud💉" <ges.salud.04@gmail.com> - no reply',
          to: req.body.email,
          subject: "Recuperacion de contraseña 📝",
          html: `<b> Estimado  ${req.body.email}, tu nueva contraseña temporal es: ${nuevaContraseña}, segui los pasos indicados en la pagina para crear la contraseña nueva </b>`,
        });
      }

      res.status(201).send({ msg: "se envio el email exitosamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "No pudimos recuperar la contraseña" });
  }
});
// router.put("/new", async function (req, res) {
//   let newPassword = req.body.passwordNew;
//   let oldPassword = req.body.passwordOld;

//   try {
//     await Persona.update(
//       { password: newPassword },
//       { where: { password: oldPassword } }
//     );
//     res
//       .status(201)
//       .send({ msg: "Se actualizo la contraseña de forma exitosa" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ msg: "No pudimos recuperar la contraseña" });
//   }
// });

module.exports = router;
