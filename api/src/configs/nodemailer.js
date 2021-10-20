const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ges.salud.04@gmail.com",
    pass: "gvoptnnjxyyzhvpa",
  },
});

transporter.verify().then(() => {
  console.log("Ready for sends emails");
});

module.exports = {
  transporter,
};
