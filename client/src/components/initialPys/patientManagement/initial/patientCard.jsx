/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pacienteDetallado } from "../../../../actions/index.js";
import './patientCard.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
const PatientCard = (props) => {
    const { id, medication, disease, persona, historiaClinica, diagnosticos } = props.pa;
    const dispatch = useDispatch()
    return (
        <div className='card-paciente'>
            <div className='header-card'>
                <div className='icon-paciente'>
                    {persona.gender === 'femenino' ? <FontAwesomeIcon icon={faFemale} className='icon mujer' /> : <FontAwesomeIcon icon={faMale} className='icon' />}
                    
                </div>
                <div className='info-paciente'>
                    <span> {persona.name.charAt(0).toUpperCase() + persona.name.slice(1) + ' ' + persona.lastName.charAt(0).toUpperCase() + persona.lastName.slice(1)}</span>
                </div>
            </div>
            <div className='identificacion'>
                <span>Dni: {persona.dni}</span>
            </div>
            <div className='opciones-paciente'>
                <Link to="/patientDetails" className='opcion' onClick={() => { dispatch(pacienteDetallado(id)) }}>Ver Mas</Link>
                <Link to="/patientEdit" className='opcion' onClick={() => { dispatch(pacienteDetallado(id)) }} >Modificar</Link>
            </div>
        </div>

    )
}

export default PatientCard;
