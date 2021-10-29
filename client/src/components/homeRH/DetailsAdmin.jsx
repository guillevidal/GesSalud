/* eslint-disable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom"
import {resetearAdministrativoDetallado} from "../../actions/index.js"
import Nav from "../Layout/Nav.jsx";

const DetailAdmin = () => {
    const dispatch = useDispatch();
    const administrativoDetallado=useSelector(state => state.administrativoDetallado)
    const {persona, status } = administrativoDetallado[0];
    const handleReset = () => {
        dispatch(resetearAdministrativoDetallado())
     }
    return (
        <div className='detalle-especialista'>
            <Nav />

            <div className='boton-regresar'>
                <Link to="/homeRRHH" className='boton' onClick={handleReset}>Volver</Link>
                <Link to="/AdminEdit" className='boton'>Modificar</Link>
            </div>

            <div className='detallecitos'>
                <div className='datos'>
                    <span className='nombre'>{persona.name.charAt(0).toUpperCase() + persona.name.slice(1) + " " + persona.lastName.charAt(0).toUpperCase() + persona.lastName.slice(1)}</span>
                    <div className='data'>
                        <span className='datodemas'>Dni: <b>{persona.dni}</b></span>
                        <span className='datodemas'>Email: <b>{persona.email}</b></span>
                        <span className='datodemas'>Celular: <b>{persona.phone}</b></span>
                        <span className='datodemas'>Direccion: <b>{persona.adress}</b></span>
                        <span className='datodemas'>Fecha de nacimiento: <b>{persona.birth}</b></span>
                    </div>
                </div>
                <div className='masDatos'>
                    <span className='datodemas'>Genero: <b>{persona.gender}</b></span>
                    <span className='datodemas'>Area: <b>{persona.rol==="1"?"Planeacion y Servicios":"Recursos Humanos"}</b></span>
                    <span className='datodemas'>Estado <b>{status?"Activo":"No activo"}</b></span>
                </div>
            </div>

        </div>
    )
}

export default DetailAdmin;