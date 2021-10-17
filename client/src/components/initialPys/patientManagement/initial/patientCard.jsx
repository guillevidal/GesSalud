import React from "react";
import {Link} from "react-router-dom";
import { useDispatch} from "react-redux";
import {pacienteDetallado} from "../../../../actions/index.js";
import './patientCard.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 
const PatientCard = ({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
    medicacion, contactos_emergencia, enfermedades }) => {

    const dispatch = useDispatch()    
    return (
        <div className='card-paciente'>  
            <div className='header-card'>
                <div className='icon-paciente'> 
                <FontAwesomeIcon icon={faUser} className='icon'/> 
                </div>      
                <div className='info-paciente'>
                    <span> {name + ' ' + lastName}</span>
                </div>
            </div>
            <div className='identificacion'>
                <span>Dni: {dni}</span>
                </div>
            <div className='opciones-paciente'>
            <Link to="/patientDetails" className='opcion' onClick={()=>{dispatch(pacienteDetallado(id))}}>Ver Detalles</Link>
            <Link to="/patientEdit" className='opcion' onClick={()=>{dispatch(pacienteDetallado(id))}} >Editar info</Link>
            </div>
        </div>
        
    )
}
    
export default PatientCard;
