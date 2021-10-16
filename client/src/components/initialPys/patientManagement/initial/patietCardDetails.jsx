import "./initialPatient.scss";
import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Nav from "../../../Layout/Nav.jsx";


const PatientCardDetails = () => {
    const patientDetails = useSelector(state => state.pacienteDetallado);

    return (
        <div id="patientDetails-container">
            <Nav/>
            <Link to="/patientPys"><button>Volver</button></Link>
            {patientDetails.map(({ id, name, lastName, dni, email, phone, adress, birth, user, password, hc,
                medicacion, contactos_emergencia, enfermedades }) => {
                return (
                    <div >
                        <p>nombre: {name}</p>
                        <p>apellido: {lastName}</p>
                        <p>dni: {dni}</p>
                        <p>email: {email}</p>
                        <p>celular: {phone}</p>
                        <p>direccion: {adress}</p>
                        <p>birth: {birth}</p>
                        <p>user: {user}</p>
                        <p>password: {password}</p>
                        <p>historia clinica: {hc}</p>
                        <p>medicacion: {medicacion}</p>
                        <p>medicacion: {contactos_emergencia}</p>
                        <p>enfermedades: {enfermedades}</p>

                    </div>)
            })}
        </div>

    )
}

export default PatientCardDetails