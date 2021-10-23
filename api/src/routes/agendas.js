const { Router } = require("express");
const { Agenda, Especialista_medico, Tipo_especialidad, Persona, Turno, Paciente } = require("../db");
const router = Router();


router.post("/", async function (req, res){
    let {date, amount, idSpecialist, idSpecialties} = req.body;
try{

    
if(date && amount && idSpecialist && idSpecialties){

    
        const crearAgenda = await Agenda.create(
            {
                date,
                amount
            },
            {
            fields:["date","amount"]
            }
        )
        const asignandoMedico = await Especialista_medico.findByPk(idSpecialist);
        asignandoMedico? await crearAgenda.setEspecialista_medico(asignandoMedico):res.status(400).send({msg:"Falta el medico especialista"}) ;
        
        const asignandoEspecialidad = await Tipo_especialidad.findByPk(idSpecialties);
        asignandoEspecialidad? await crearAgenda.setTipo_especialidad(asignandoEspecialidad):res.status(400).send({msg:"Falta la especialidad"}) 
        res.status(200).send(crearAgenda)
}else{
    res.status(400).send({msg:"No se pudo crear la agenda"})
}

}catch(e){
res.status(400).send({msg:"No se pudo crear la agenda"})
}
})



router.get("/", async function (req, res){
    try{

        let totalAgendas = await Agenda.findAll({
            attributes:{exclude:["especialistaMedicoId", "tipoEspecialidadId"]},
            include: [{
                //attributes:["id","date","amount"],
                model: Especialista_medico,
                attributes:{exclude:["enrollment", "specialty"]},
                include:{
                    model:Persona,
                    attributes: [
                        "name",
                        "lastName"
                      ]
                } 
              },{
                  model: Tipo_especialidad
              },
              {
                model:Turno,
                attributes:{exclude:["modules","agendaId","pacienteId"]},
                include:{
                    model:Paciente,
                    attributes:{exclude:["medication","personaId","emergencyContact","disease"]},
                    include:{
                        model:Persona,
                        attributes: [
                            "name",
                            "lastName"
                          ]
                    } 
                }
                
              }
              ]}
        );
        res.status(200).send(totalAgendas)

    }catch(e){
        res.status(400).send({msg:"No se pudo encontrar las agendas"})
    }

} );



router.put("/:id", async function (req, res){
try{
let id =req.params.id
let query = await Agenda.findByPk(id);
let { especialistaMedicoId, tipoEspecialidadId, date, amount} = req.body;

await Agenda.update({especialistaMedicoId, tipoEspecialidadId, date, amount}, {where :{id}})
res.status(200).send({msg:"Se actualizaron los datos correctamente"});

}catch(e){

    res.status(400).send({msg:"No se pudo modificar la agenda"});
}

} );


module.exports = router;
