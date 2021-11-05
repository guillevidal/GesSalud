/* eslint-disable */
import React, { useState, useEffect }from "react";
import {useDispatch, useSelector} from "react-redux";
import PatientCard from "./patientCard.jsx";
import {Link} from "react-router-dom";
import SearchPatient from "./searchPatient.jsx";
import Nav from "../../../Layout/Nav.jsx";
import "./initialPatient.scss";
import { obtenerPacientes, paginado, obtenerEspecialistas, obtenerAdministrativos} from "../../../../actions/index.js";
import Paginado from "./Paginado.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const InitialPatient = () => {
    const pacientes = useSelector(state => state.pacientes)
    const valorPaginado = useSelector( state => state.paginado)
    const [busquedaPaciente1, setBusquedaPaciente1]= useState([])
    const dispatch = useDispatch()
    useEffect( () => {

         dispatch(paginado(0))
        dispatch(obtenerPacientes())
        dispatch(obtenerEspecialistas())
        dispatch(obtenerAdministrativos())
    },[])

    return (
        <div id="initialPatient-container">
            <Nav/>
            <div className='header-paciente'>
            <SearchPatient busquedaPaciente1={busquedaPaciente1} setBusquedaPaciente1={setBusquedaPaciente1}
            pacientes={pacientes}/>

           


            <div className='boton-crear-paciente-div'>
            <Link to="/createPatient" className='boton-crear-paciente'>Crear Paciente</Link>
            </div>
            </div>

            {busquedaPaciente1 && busquedaPaciente1.length > 6 ? <Paginado busquedaPaciente1={busquedaPaciente1}/> :null}
            {!busquedaPaciente1.length && pacientes && pacientes.length > 6 ? <Paginado busquedaPaciente1={busquedaPaciente1}/> :null}
        
            <div id="prueba">
            {(pacientes[0] && pacientes[0].length < 1) && <span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontraron pacientes registrados</span>}          
            {!busquedaPaciente1[0]?pacientes[0] && pacientes.slice(valorPaginado, valorPaginado+6).map((pa) => {
                return (
                    <PatientCard pa={pa}/>
                )
            }):
            typeof busquedaPaciente1[0]!=="string"?busquedaPaciente1.slice(valorPaginado, valorPaginado+6).map((pa) => {
                return (
                    <PatientCard  pa={pa}/> 
                )
                
            }):<span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontraron pacientes</span>
            }
            </div>
        </div>
    )
}

export default InitialPatient