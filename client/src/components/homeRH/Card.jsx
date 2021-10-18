/* eslint-disable */
import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { especialistaDetallado } from "../../actions/index.js";
import './Card.scss'

export default function Card(props) {
    const dispatch = useDispatch();
    const {id,enrollment,specialty,personaId,agendaTotalId,persona}=props.e
    return (
        <div className='card-especialista'>
            <div className='datos-principales'>

            <span className='nombre-apellido'>{persona.name.charAt(0).toUpperCase() + persona.name.slice(1) + " " + persona.lastName.charAt(0).toUpperCase() + persona.lastName.slice(1)}</span>
            <span className='especialidad'>{specialty}</span>
            <span className='dni'>Dni: {' ' +persona.dni}</span>

            </div>
            
        <div className='links'>
            <Link className='enlace' onClick={() => dispatch(especialistaDetallado(id))} to="/detailEspecialista">
                Ver mas
            </Link>
            <Link className='enlace' onClick={() => dispatch(especialistaDetallado(id))} to='/specialtyEdit'>
                Modificar
            </Link>
        </div>
            
        </div>
    )
}

