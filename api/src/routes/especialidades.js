const { Router } = require("express");
const { Persona, Tipo_especialidad } = require("../db");
const router = Router();

router.get("/", async function (req, res, next) {
 try{
   
   let specialties = await Tipo_especialidad.findAll()
     res.status(200).send(specialties);

 }catch(e){

 res.status(400).send({msg: "No se encuentran las especialidades"})

 }
});

module.exports = router;
