/* eslint-disable */
import React from 'react'
import { useSelector} from "react-redux";
import Nav from '../Layout/Nav.jsx';

export default function DetailEspecialista() {
    const especialistaDetallado = useSelector((state) => state.especialistaDetallado);
    const {id,persona,specialty,enrollment, agendaTotalId, personaId } = especialistaDetallado[0];

    return (
        <div>
            <Nav/>
            <p>nombre: {persona.name}</p>
            <p>apellido: {persona.lastName}</p>
            <p>dni: {persona.dni}</p>
            <p>email: {persona.email}</p>
            <p>celular: {persona.phone}</p>
            <p>direccion: {persona.adress}</p>
            <p>fecha de nacimiento: {persona.birth}</p>
            <p>usuario: {persona.user}</p>
            <p>clave: {persona.password}</p>
            <p>genero: {persona.gender}</p>
            <p>especialidad: {specialty}</p>
            <p>dni profesional {enrollment}</p>
          
        </div>
    )
}
