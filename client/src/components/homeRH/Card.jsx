/* eslint-disable */
import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { especialistaDetallado } from "../../actions/index.js";

export default function Card(props) {
    const dispatch = useDispatch();
    const {id,enrollment,specialty,personaId,agendaTotalId,persona}=props.e
    return (
        <div>
            <p>Nombre: <span>{persona.name + " " + persona.lastName}</span></p>
            <p>Especialidad: <span>{specialty}</span></p>
            <p>Especialidad: <span>{persona.email}</span></p>

            <Link onClick={() => dispatch(especialistaDetallado(id))} to="/detailEspecialista">
                <button>Ver mas</button>
            </Link>
            <Link to='/createSpecialist'>
                <button>Modificar</button>
            </Link>
            
        </div>
    )
}

