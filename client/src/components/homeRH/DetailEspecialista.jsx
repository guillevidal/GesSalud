/* eslint-disable */
import React, { useEffect} from 'react'
import { useSelector, useDispatch} from "react-redux";
import Nav from '../Layout/Nav.jsx';
import './DetailEspecialista.scss'
import { Link, useParams, withRouter } from 'react-router-dom';
import {resetearEspecialistaDetallado} from "../../actions/index.js"
const  DetailEspecialista = () => {
    const dispatch = useDispatch();
    const especialistaD= useSelector(state => state.especialistaDetallado)
    const {persona,specialty,enrollment, agendaTotalId, personaId } = especialistaD[0];
    const handleReset = () => {
       dispatch(resetearEspecialistaDetallado()) 
    }
    return (
        <div className='detalle-especialista'>
            <Nav/>

             <div className='boton-regresar'>
                <Link to="/homeRRHH" className='boton' onClick={handleReset}>Volver</Link>
                <Link to="/specialtyEdit" className='boton'>Modificar</Link>
            </div>

            <div className='card-detail'>
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
            <span className='datodemas'>Especialidad: <b>{specialty}</b></span>
            <span className='datodemas'>N° Enrolamiento <b>{enrollment}</b></span>
            </div>
            </div> 
          
        </div>
      
    )
}
export default DetailEspecialista;
