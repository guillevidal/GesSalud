import React, { useState, useEffect }from "react";
import {useDispatch, useSelector} from "react-redux";
import PatientCard from "./patientCard.jsx";
import {Link} from "react-router-dom";
import SearchPatient from "./searchPatient.jsx";
import Nav from "../../../Layout/Nav.jsx";
import "./initialPatient.scss";
import { obtenerPacientes } from "../../../../actions/index.js";

const InitialPatient = () => {
    const pacientes = useSelector(state => state.pacientes)
    const busquedaPaciente = useSelector(state => state.busquedaPaciente)
    const [details, setDetails]=useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(obtenerPacientes())
    },[])

    return (
        <div id="initialPatient-container">
            <Nav/>
            <div className='header-paciente'>
            <SearchPatient/>
            <div className='boton-crear-paciente-div'>
            <Link to="/createPatient" className='boton-crear-paciente'>Crear Paciente</Link>
            </div>
            </div>
            <div id="prueba">       
            {!busquedaPaciente[0]?pacientes.map(({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
             medicacion, contactos_emergencia, enfermedades }) => {
                return (
                    <PatientCard key={id} id={id} name={name} lastName={lastName} dni={dni} email={email}
                        phone={phone} adress={adress} birth={birth} user={user} password={password}
                        hc={hc} medicacion={medicacion} contactos_emergencia={contactos_emergencia}
                        enfermedades={enfermedades} setDetails={setDetails} details={details}
                     />
                )
            }):
            typeof busquedaPaciente[0]!=="string"?busquedaPaciente.map(({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
                medicacion, contactos_emergencia, enfermedades}) => {
                return (
                    <PatientCard key={id} name={name} lastName={lastName} dni={dni} email={email}
                    phone={phone} adress={adress} birth={birth} user={user} password={password}
                    hc={hc} medicacion={medicacion} contactos_emergencia={contactos_emergencia}
                    enfermedades={enfermedades}
                 /> 
                )
                
            }):<h1>{busquedaPaciente[0]}</h1>
            }
            </div>
        </div>
    )
}

export default InitialPatient