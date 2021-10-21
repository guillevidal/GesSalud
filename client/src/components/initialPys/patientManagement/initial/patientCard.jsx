/* eslint-disable */
import React, { useState} from "react";
import { Redirect} from "react-router-dom";
import { useDispatch } from "react-redux";
import { pacienteDetallado } from "../../../../actions/index.js";
import './patientCard.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
const PatientCard = (props) => {
    const [status, setStatus] = useState({ details: false, edit: false })
    const { id, medication, disease, persona, historiaClinica, diagnosticos } = props.pa;

    const handleDetails = async () => {
        await dispatch(pacienteDetallado(persona.dni))
        setStatus({ details: true, edit: false })
    }
    const handleEdit = async () => {

        await dispatch(pacienteDetallado(persona.dni))
        setStatus({ details: false, edit: true })
    }
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
                {status.details && <Redirect to={`/patientDetails`} />}
                {status.edit && <Redirect to={`/patientEdit`} />}
                <button className='opcion' onClick={handleDetails} >
                    Ver mas
                </button>
                <button className='opcion' onClick={handleEdit}>
                    Modificar
                </button>
            </div>
        </div>

    )
}

export default PatientCard;
