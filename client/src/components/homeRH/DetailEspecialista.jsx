/* eslint-disable */
import React from 'react'
import { useSelector} from "react-redux";
import Nav from '../Layout/Nav.jsx';
import './DetailEspecialista.scss'
import { Link } from 'react-router-dom';

export default function DetailEspecialista() {
    const especialistaDetallado = useSelector((state) => state.especialistaDetallado);
    const {id,persona,specialty,enrollment, agendaTotalId, personaId } = especialistaDetallado[0];
    console.log('PERSONA detail especialista', especialistaDetallado);
    return (
        <div className='detalle-especialista'>
            <Nav/>

            <div className='boton-regresar'>
                <Link to="/homeRRHH" className='boton'>Volver</Link>
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
