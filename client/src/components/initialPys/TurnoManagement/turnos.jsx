import React from "react"


const Turnos = ({paciente, agenda,  hour}) => {
  
    let fecha=hour.slice(0, 9)
    let horaI=hour.slice(11, 16)
    let horaF=hour.slice(17, hour.length)
    return (
        <div className='container-info-turnos'>
            <div>
                <h6>Especialista</h6>
                <span>{agenda.especialista_medico.persona.name}</span>
            </div>
            <div>
                <h6>Especialidad</h6>
                <span>{agenda.tipo_especialidad.name}</span>
            </div>
            <div>
                <h6>Paciente</h6>
                <span>{paciente.persona.name}</span>
            </div>
            <div>
                <h6>Fecha</h6>
                <span>{fecha}</span>
            </div>
            <div>
                <h6>Duracion</h6>
                <span> de {horaI} hasta {horaF}</span>
               
            </div>
            

        </div>
    )
}
export default Turnos