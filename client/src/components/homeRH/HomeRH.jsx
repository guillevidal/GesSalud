/* eslint-disable */
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Nav from '../Layout/Nav';
import CardSpeciality from "./CardSpeciality.jsx"
import { rol, obtenerEspecialistas, paginado, obtenerAdministrativos, obtenerPacientesRegistro} from '../../actions/index';
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
        dispatch(obtenerPacientesRegistro())
    }, [])

    const especialistas = useSelector(state => state.especialistas)
    const administrativos = useSelector(state => state.administrativos)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista)
    const valorPaginado = useSelector(state => state.paginado)
    const [busquedaAdministrativo2, setBusquedaAdministrativo2] = useState([])
    const handleEmpleados = (e) => {
        const { value } = e.target
        dispatch(obtenerAdministrativos())
        dispatch(obtenerEspecialistas())
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
            {empleados === "administrativos" && <SearchAdmin  setBusquedaAdministrativo2={setBusquedaAdministrativo2}/>}

            {empleados === "especialistas" && busquedaEspecialista && busquedaEspecialista.length > 6 ? <Paginado /> : null}
            {empleados === "especialistas" && !busquedaEspecialista.length && especialistas && especialistas.length > 6 ? <Paginado /> : null}

            {empleados === "administrativos" && busquedaAdministrativo2 && busquedaAdministrativo2.length > 6 ? <PaginadoAdmin busquedaAdministrativo2={busquedaAdministrativo2}/> : null}
            {empleados === "administrativos" && !busquedaAdministrativo2.length && administrativos && administrativos.length > 6 ? <PaginadoAdmin busquedaAdministrativo2={busquedaAdministrativo2}/> : null}

            <div className='tarjetas'>
                {(especialistas[0] && especialistas[0].length < 1) && <span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontraron pacientes registrados</span>}          
            
                {empleados === "especialistas" && !busquedaEspecialista[0] ? especialistas[0] && especialistas.slice(valorPaginado, valorPaginado + 6).map(e => {
                    return (
                        <CardSpeciality e={e} key={e.id} />)
                })
                    :
                    typeof busquedaEspecialista[0] === "string" ? <span className='empty'><FontAwesomeIcon icon={faTimesCircle} />{busquedaEspecialista[0]}</span> : busquedaEspecialista.slice(valorPaginado, valorPaginado + 6).map(e => {
                        return (
                            <CardSpeciality e={e} key={e.id + "busqueda"} />
                        )
                    })}

                {empleados === "administrativos" && !busquedaAdministrativo2[0] ? !administrativos[0] ? <span className='empty'><FontAwesomeIcon icon={faTimesCircle} /> No se encontró administrativo registrado</span> : administrativos.slice(valorPaginado, valorPaginado + 6).map(e => {
                    return (
                        <CardAdmin e={e} key={e.id} />)
                })
                    :
                    typeof busquedaAdministrativo2[0] === "string" ? <h1>{busquedaAdministrativo2[0]}</h1> : busquedaAdministrativo2.slice(valorPaginado, valorPaginado + 6).map(e => {
                        return (
                            <CardAdmin e={e} key={e.id + "busqueda"} />
                        )
                    })}


            </div>
        </div>
    )
}


export default HomeRH
