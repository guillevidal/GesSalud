/* eslint-disable */
import React from "react"


const TurnosCard = ({paciente, agenda,  hour, status}) => {
    let fecha=hour.slice(0, 10)
    let horaI=hour.slice(11, 16)
    let horaF=hour.slice(17, hour.length)
    return (
        <div className='container-info-turnos'>
            <div>
                <span>Especialista </span>
                <span>{agenda.especialista_medico.persona.name.toUpperCase()} {agenda.especialista_medico.persona.lastName.toUpperCase()}</span>
            </div>
            <div>
                <span>Especialidad </span>
                <span>{agenda.tipo_especialidad.name.toUpperCase()}</span>
            </div>
            <div>
                <span>Paciente </span>
                <span>{paciente.persona.name.toUpperCase()} {paciente.persona.lastName.toUpperCase()}</span>
            </div>
            <div>
                <span>Fecha </span>
                <span>{fecha}</span>
            </div>
            <div>
                <span>Duracion </span>
                <span> de {horaI} hasta {horaF}</span>
               
            </div>
            <div>
                <span>Estado </span>
                <span>{status.toUpperCase()}</span>
               
            </div>
            <div>
                <button>Modificar</button>
                <button>Realizar Pago</button>
            </div>

        </div>
    )
}
export default TurnosCard