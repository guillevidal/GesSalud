import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {especialistaDetallado} from '../../actions/index';
import {Link} from 'react-router-dom';

        

export default function DetailEspecialista(id) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(especialistaDetallado(id));
    },[dispatch, id]);
    
    const especialistDetail = useSelector((state) => state.especialistaDetallado);
    const {name, lastName, dni, email, phone, adress, birth, user, password, gender, specialty} = especialistDetail;

    return (
        <div>
            <p>nombre: {name}</p>
            <p>apellido: {lastName}</p>
            <p>dni: {dni}</p>
            <p>email: {email}</p>
            <p>celular: {phone}</p>
            <p>direccion: {adress}</p>
            <p>fecha de nacimiento: {birth}</p>
            <p>usuario: {user}</p>
            <p>clave: {password}</p>
            <p>genero: {gender}</p>
            <p>especialidad: {specialty}</p>

            <Link to={`/homeRRHH`} >
                <h4>volver</h4>
            </Link>            
        </div>
    )
}
