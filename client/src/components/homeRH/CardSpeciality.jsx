/* eslint-disable */
import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { especialistaDetallado } from "../../actions/index.js";
import './Card.scss'

export default function Card(props) {
    const [status, setStatus] = useState({ details: false, edit: false })
    const dispatch = useDispatch();


    const { id, enrollment, specialty, personaId, agendaTotalId, persona } = props.e

    const handleDetails = async () => {
        await dispatch(especialistaDetallado(id))
        setStatus({ details: true, edit: false })
    }
    const handleEdit = async () => {
        await dispatch(especialistaDetallado(id))
        setStatus({ details: false, edit: true })
    }

    return (
        <div className='card-especialista'>
            <div className='datos-principales'>

                <span className='nombre-apellido'>{persona.name.charAt(0).toUpperCase() + persona.name.slice(1) + " " + persona.lastName.charAt(0).toUpperCase() + persona.lastName.slice(1)}</span>
                <span className='especialidad'>{specialty}</span>
                <span className='dni'>Dni: {' ' + persona.dni}</span>

            </div>

            <div className='links'>
                {status.details && <Redirect to={`/detailEspecialista`} />}
                {status.edit && <Redirect to={`/specialtyEdit`} />}
                <button className='enlace' onClick={handleDetails} >
                    Ver mas
                </button>
                <button className='enlace' onClick={handleEdit}>
                    Modificar
                </button>
            </div>

        </div>
    )
}

