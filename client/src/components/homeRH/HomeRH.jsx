/* eslint-disable */
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Nav from '../Layout/Nav';
import CardSpeciality from "./CardSpeciality.jsx"
import { rol, obtenerEspecialistas, paginado, obtenerAdministrativos} from '../../actions/index';
import './HomeRH.scss'
import SearchEspecialist from './SearchEspecialist';
import SearchAdmin from './SearchAmin.jsx';
import Paginado from './Paginado';
import PaginadoAdmin from './PaginadoAdmin.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CardAdmin from './CardAdmin.jsx';
const HomeRH = () => {
    const dispatch = useDispatch();
    const [empleados, setEmpleados] = useState("especialistas")
    useEffect(() => {
        

        dispatch(paginado(0))
        dispatch(obtenerEspecialistas())
        dispatch(obtenerAdministrativos())
    }, [])

    const especialistas = useSelector(state => state.especialistas)
    const administrativos = useSelector(state => state.administrativos)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista)
    const busquedaAdministrativo = useSelector(state => state.busquedaAdministrativo)
    const valorPaginado = useSelector(state => state.paginado)

    const handleEmpleados = (e) => {
        const { value } = e.target
        setEmpleados(value)
    }
    return (
        <div className='container-homeRRHH'>
            <Nav />
            <select onChange={(e) => handleEmpleados(e)} className='panel'>
                <option value="especialistas">Especialistas</option>
                <option value="administrativos">Administrativos</option>

            </select>
            {empleados === "especialistas" && <SearchEspecialist/>}
            {empleados === "administrativos" && <SearchAdmin/>}

            {empleados === "especialistas" && busquedaEspecialista && busquedaEspecialista.length > 6 ? <Paginado /> : null}
            {empleados === "especialistas" && !busquedaEspecialista.length && especialistas && especialistas.length > 6 ? <Paginado /> : null}

            {empleados === "administrativos" && busquedaAdministrativo && busquedaAdministrativo.length > 6 ? <PaginadoAdmin /> : null}
            {empleados === "administrativos" && !busquedaAdministrativo.length && administrativos && administrativos.length > 6 ? <PaginadoAdmin /> : null}

            <div className='tarjetas'>

                {empleados === "especialistas" && !busquedaEspecialista[0] ? !especialistas[0] ? <span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontró especialista registrado</span> : especialistas.slice(valorPaginado, valorPaginado + 6).map(e => {
                    return (
                        <CardSpeciality e={e} key={e.id} />)
                })
                    :
                    typeof busquedaEspecialista[0] === "string" ? <h1>{busquedaEspecialista[0]}</h1> : busquedaEspecialista.slice(valorPaginado, valorPaginado + 6).map(e => {
                        return (
                            <CardSpeciality e={e} key={e.id + "busqueda"} />
                        )
                    })}

                {empleados === "administrativos" && !busquedaAdministrativo[0] ? !administrativos[0] ? <span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontró administrativo registrado</span> : administrativos.slice(valorPaginado, valorPaginado + 6).map(e => {
                    return (
                        <CardAdmin e={e} key={e.id} />)
                })
                    :
                    typeof busquedaAdministrativo[0] === "string" ? <h1>{busquedaAdministrativo[0]}</h1> : busquedaAdministrativo.slice(valorPaginado, valorPaginado + 6).map(e => {
                        return (
                            <CardAdmin e={e} key={e.id + "busqueda"} />
                        )
                    })}


            </div>
        </div>
    )
}


export default HomeRH
