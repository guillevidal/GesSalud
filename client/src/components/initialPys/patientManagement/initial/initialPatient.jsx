import React from "react";
import {useSelector} from "react-redux";
import PatientCard from "./patientCard.jsx";
import {Link} from "react-router-dom";
import SearchPatient from "./searchPatient.jsx";
import Nav from "../../../Layout/Nav.jsx";
import "./initialPatient.scss"
const InitialPatient = () => {
    const pacientes = useSelector(state => state.pacientes)

    return (
        <div id="initialPatient-contairner">
            <Nav/>
            <Link to="/initialPys"><button>Volver</button></Link> 
            <SearchPatient/>
            <Link to="/createPatient"><button>Crear Paciente</button></Link>       
            {pacientes[0]?pacientes.map(({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
             medicacion, contactos_emergencia, enfermedades }) => {
                return (
                    <PatientCard key={id} name={name} lastName={lastName} dni={dni} email={email}
                        phone={phone} adress={adress} birth={birth} user={user} password={password}
                        hc={hc} medicacion={medicacion} contactos_emergencia={contactos_emergencia}
                        enfermedades={enfermedades}
                     />
                )
            }):<h1>No se econtraron pacientes registrados</h1>}
        </div>
    )
}

export default InitialPatient