/* eslint-disable */
import React from "react"
import './InicialTurno.scss';


const TurnosCard = ({paciente, agenda,  hour, status}) => {
    let fecha=hour.slice(0, 10)
    let horaI=hour.slice(11, 16)
    let horaF=hour.slice(17, hour.length)
    return (
        <div className='container-info-turnos'>
            <div className='apartado'>
                <span className='subtitle'>Especialista </span>
                <span className='data'>{agenda.especialista_medico.persona.name} {agenda.especialista_medico.persona.lastName}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Especialidad </span>
                <span className='data'>{agenda.tipo_especialidad.name}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Paciente </span>
                <span className='data'>{paciente.persona.name} {paciente.persona.lastName}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Fecha </span>
                <span className='data'>{fecha}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Duracion </span>
                <span className='data'> de {horaI} hasta {horaF}</span>
               
            </div>
            <div className='apartado'>
                <span className='subtitle'>Estado </span>
                <span className='data'>{status.toUpperCase()}</span>
               
            </div>
            <div className='botones'>
                <button className='boton'>Modificar</button>
                <button className='boton'>Realizar Pago</button>
            </div>

        </div>
    )
}
export default TurnosCard