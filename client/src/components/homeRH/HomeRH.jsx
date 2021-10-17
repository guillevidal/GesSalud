import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Nav from '../Layout/Nav';
import Card from "./Card.jsx"
import {obtenerEspecialistas, paginado} from '../../actions/index';
import './homeRH.scss'
import SearchEspecialist from './SearchEspecialist';
import Paginado from './Paginado';

const HomeRH = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(obtenerEspecialistas())
    },[])

    const especialistas = useSelector( state => state.especialistas)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista)
    const valorPaginado = useSelector(state => state.paginado)

    return (
        <div className='container-homeRRHH'>
            <Nav/>
            <SearchEspecialist/>
           
            {!busquedaEspecialista[0]?especialistas.slice(valorPaginado, valorPaginado+6).map(e => {
                return(
                    <Card e={e} key={e.id}/>)})
            :
            typeof busquedaEspecialista[0]==="string"?<h1>{busquedaEspecialista[0]}</h1>:busquedaEspecialista.slice(valorPaginado, valorPaginado+6).map(e => {
                return (
                    <Card e={e} key={e.id+"busqueda"}/>
                )
            })}
            <Paginado/>
        </div>
    )
}


export default HomeRH
