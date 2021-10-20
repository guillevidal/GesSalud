/* eslint-disable */
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Nav from '../Layout/Nav';
import Card from "./Card.jsx"
import {obtenerEspecialistas, paginado} from '../../actions/index';

import SearchEspecialist from './SearchEspecialist';
import Paginado from './Paginado';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const HomeRH = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paginado(0))
        dispatch(obtenerEspecialistas())
    },[])

    const especialistas = useSelector( state => state.especialistas)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista)
    const valorPaginado = useSelector(state => state.paginado)

    return (
        <div className='container-homeRRHH'>
            <Nav/>
            <SearchEspecialist/>

            {busquedaEspecialista && busquedaEspecialista.length > 6 ? <Paginado/> :null}
        {!busquedaEspecialista.length && especialistas && especialistas.length > 6 ? <Paginado/> :null}
        

            <div className='tarjetas'>
           
            {!busquedaEspecialista[0]?!especialistas[0]?<span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontró especialista registrado</span>:especialistas.slice(valorPaginado, valorPaginado+6).map(e => {
                return(
                    <Card e={e} key={e.id}/>)})
            :
            typeof busquedaEspecialista[0]==="string"?<h1>{busquedaEspecialista[0]}</h1>:busquedaEspecialista.slice(valorPaginado, valorPaginado+6).map(e => {
                return (
                    <Card e={e} key={e.id+"busqueda"}/>
                )
            })}

        </div>
       </div>
    )
}


export default HomeRH
