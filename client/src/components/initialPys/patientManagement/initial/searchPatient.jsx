import React, { useState} from "react";
import { useDispatch} from "react-redux"
import {obtenerPacientePorNombre, obtenerPacientes} from "../../../../actions/index.js"

const SearchPatient = () => {
    const dispatch = useDispatch()
    const [input, setInput] =useState("")  

    const handleChange = (e) => {
        if(e.target.value.length===0){
            setInput(e.target.value)
            dispatch(obtenerPacientes)
        }else{
        setInput(e.target.value)}
        dispatch(obtenerPacientePorNombre(e.target.value))       
    }
    return (
        <>
        <input placeholder="Busque paciente" value={input} onChange={(e)=>{handleChange(e)}}></input>
        </>
    )
}

export default SearchPatient;