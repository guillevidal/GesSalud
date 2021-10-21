/* eslint-disable */
import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {resetearPacienteDetallado} from "../../../../actions/index.js"
import Nav from "../../../Layout/Nav.jsx";
import './patientCardDetails.scss';


const PatientCardDetails = () => {
    const dispatch = useDispatch()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const patientDetails = useSelector(state => state.pacienteDetallado);
    const { id, name, lastName, dni, email, phone, adress, birth, paciente, gender,  } = patientDetails[0];
    const handleReset = () => {
        dispatch(resetearPacienteDetallado())
    }
    return (
        <div id="patientDetails-container">
            <Nav />
            <div className='boton-regresar'>
                <Link to="/patientPys" onClick={handleReset} className='boton'>Volver</Link>
                <Link to="/patientEdit" className='boton'>Modificar</Link>
            </div>
            <div className='lista-detalles'>

                <div className='detalles'>
                    <div className='encabezado'>
                        <span className='nombre-apellido'>{capitalFirstLetter(name) + ' ' + capitalFirstLetter(lastName)}</span>
                    </div>
                    <div className='data'>
                        <span className='data-info'>Dni: <b className='data-detail'>{dni}</b></span>
                        <span className='data-info'>Email: <b className='data-detail'> {email}</b></span>
                        <span className='data-info'>Celular: <b className='data-detail'> {phone}</b></span>
                        <span className='data-info'>Direccion: <b className='data-detail'>{adress}</b></span>
                        <span className='data-info'>Birth: <b className='data-detail'>{birth}</b></span>
                        <span className='data-info'>Genero: <b className='data-detail'>{gender}</b></span>
                    </div>
                    <div className='data'>
                        <span className='data-info'>Historia clinica: <b className='data-detail'>{paciente.historiaClinica.creationDate}</b></span>
                        <span className='data-info'>Medicacion: <b className='data-detail'>{paciente.medication}</b></span>
                        <span className='data-info'>Contacto de emergencia: <b className='data-detail'> {paciente.emergencyContact}</b></span>
                        <span className='data-info'>Enfermedades: <b className='data-detail'>{paciente.disease}</b></span>
                    </div>
                </div>
               
            </div>
            
        </div>

    )
}

export default PatientCardDetails