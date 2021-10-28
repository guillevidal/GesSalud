/* eslint-disable */
import React, { useState, useEffect }from "react";
import {useDispatch, useSelector} from "react-redux";
import PatientCard from "./patientCard.jsx";
import {Link} from "react-router-dom";
import SearchPatient from "./searchPatient.jsx";
import Nav from "../../../Layout/Nav.jsx";
import "./initialPatient.scss";
import { rol, obtenerPacientes, paginado } from "../../../../actions/index.js";
import Paginado from "./Paginado.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const InitialPatient = () => {
    const pacientes = useSelector(state => state.pacientes)
    const busquedaPaciente = useSelector(state => state.busquedaPaciente)
    const valorPaginado = useSelector( state => state.paginado)
    const [details, setDetails]=useState(false);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(paginado(0))
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

            {busquedaPaciente && busquedaPaciente.length > 6 ? <Paginado/> :null}
            {!busquedaPaciente.length && pacientes && pacientes.length > 6 ? <Paginado/> :null}
        
            <div id="prueba">       
            {!busquedaPaciente[0]?!pacientes[0]?<span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontraron pacientes registrados</span>:pacientes.slice(valorPaginado, valorPaginado+6).map((pa) => {
                return (
                    <PatientCard pa={pa}/>
                )
            }):
            typeof busquedaPaciente[0]!=="string"?busquedaPaciente.slice(valorPaginado, valorPaginado+6).map((pa) => {
                return (
                    <PatientCard  pa={pa}/> 
                )
                
            }):<h1>{busquedaPaciente[0]}</h1>
            }
            </div>
        </div>
    )
}

export default InitialPatient