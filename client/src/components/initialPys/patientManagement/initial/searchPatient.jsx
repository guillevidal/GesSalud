/* eslint-disable */
import React, { useState} from "react";
import './searchPatient.scss'
import { useDispatch} from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {obtenerPacientePorNombre, obtenerPacientes, resetearBusquedaPaciente, paginado} from "../../../../actions/index.js"

const SearchPatient = () => {
    const dispatch = useDispatch()
    const [input, setInput] =useState("")  

    const handleChange = (e) => {
        if(e.target.value.length===0){
            dispatch(paginado(0))
            setInput(e.target.value)
            dispatch(resetearBusquedaPaciente())
            dispatch(obtenerPacientes())
            return
        }else{
        dispatch(paginado(0))
        setInput(e.target.value)}
        dispatch(obtenerPacientePorNombre(e.target.value))
        return       
    }
    return (
        <div className='input-buscador'>
        <FontAwesomeIcon icon={faSearch} className='icon-search'/>
        <input className='input-search' placeholder='Paciente' value={input} onChange={(e)=>{handleChange(e)}}></input>
        </div>
    )
}

export default SearchPatient;