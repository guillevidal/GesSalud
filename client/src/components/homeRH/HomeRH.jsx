/* eslint-disable */
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Nav from '../Layout/Nav';
import Card from "./Card.jsx"
import {obtenerEspecialistas, paginado} from '../../actions/index';
import './HomeRH.scss'
import SearchEspecialist from './SearchEspecialist';
import Paginado from './Paginado';

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

            <div className='tarjetas'>
           
            {!busquedaEspecialista[0]?!especialistas[0]?<h1>No se econtro especialista registrado</h1>:especialistas.slice(valorPaginado, valorPaginado+6).map(e => {
                return(
                    <Card e={e} key={e.id}/>)})
            :
            typeof busquedaEspecialista[0]==="string"?<h1>{busquedaEspecialista[0]}</h1>:busquedaEspecialista.slice(valorPaginado, valorPaginado+6).map(e => {
                return (
                    <Card e={e} key={e.id+"busqueda"}/>
                )
            })}

        </div>
            <Paginado/>
        </div>
    )
}


export default HomeRH
