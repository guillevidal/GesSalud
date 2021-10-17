import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Nav from "../../../Layout/Nav.jsx";
import './patientCardDetails.scss';


const PatientCardDetails = () => {
    const patientDetails = useSelector(state => state.pacienteDetallado);

    return (
        <div id="patientDetails-container">
            <Nav/>
            <div className='boton-regresar'>
                <Link to="/patientPys" className='boton'>Volver</Link>
            </div>
            <div className='lista-detalles'>
            {patientDetails.map(({ id, name, lastName, dni, email, phone, adress, birth, user, password, hc,
                medicacion, contactos_emergencia, enfermedades }) => {
                return (
                    <div className='detalles'>
                        <div className='encabezado'>
                            <span className='nombre-apellido'>{name + ' ' + lastName}</span>
                       </div>
                        <div className='data'>
                        <span className='data-info'>Dni: <b className='data-detail'>{dni}</b></span>
                        <span className='data-info'>Email: <b className='data-detail'>{email}</b></span>
                        <span className='data-info'>Celular: <b className='data-detail'>{phone}</b></span>
                        <span className='data-info'>Direccion: <b className='data-detail'>{adress}</b></span>
                        <span className='data-info'>Birth: <b className='data-detail'>{birth}</b></span>
                        </div>    
                        <div className='data'>  
                        <span className='data-info'>historia clinica: <b className='data-detail'>{hc}</b></span>
                        <span className='data-info'>medicacion: <b className='data-detail'>{medicacion}</b></span>
                        <span className='data-info'>medicacion: <b className='data-detail'>{contactos_emergencia}</b></span>
                        <span className='data-info'>enfermedades: <b className='data-detail'>{enfermedades}</b></span>
                        </div>
                    </div>)
            })}
            </div>
        </div>

    )
}

export default PatientCardDetails