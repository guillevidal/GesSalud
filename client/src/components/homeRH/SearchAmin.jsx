/* eslint-disable */
import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {busquedaAdminstrativo,  obtenerAdministrativos,
    resetearBusquedaAdministrativo, paginado} from "../../actions/index.js"
import './SearchEspecialista.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchEspecialist = () => {
    const dispatch= useDispatch();
    const [input, setInput]= useState("")
    const handleChange = (e) => {    
        
        if(e.target.value.length===0){
            dispatch(paginado(0))
            setInput(e.target.value)
            dispatch(resetearBusquedaAdministrativo())
            dispatch(obtenerAdministrativos())

        }else {
            dispatch(paginado(0))
            setInput(e.target.value)
            dispatch(busquedaAdminstrativo(e.target.value))
        }
    }



    return (
        <div className='buscador-especialista'>
            <div className='elementos-buscador-admin'>
                
            <FontAwesomeIcon icon={faSearch} className='icon-search'/>
           
            <input className='input-buscador' type="text" placeholder="Buscar Administrativo" onChange={(e)=>handleChange(e)} value={input}/>
            </div>
           
        </div>
    )
}

export default SearchEspecialist;