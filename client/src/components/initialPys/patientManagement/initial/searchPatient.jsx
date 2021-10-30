/* eslint-disable */
import React, { useState} from "react";
import './searchPatient.scss'
import { useDispatch} from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { obtenerPacientes, paginado} from "../../../../actions/index.js"

const SearchPatient = ({ setBusquedaPaciente1, pacientes}) => {
    const dispatch = useDispatch()
    const [input, setInput] =useState("")  
    const [option, setOption]=useState("nombre")
    const handleChange = (e) => {
        const { value}= e.target
        dispatch(paginado(0))
        setInput(value)
        if(value===0){
            setBusquedaPaciente1([])
            dispatch(obtenerPacientes())
        }else{
            if(option==="nombre"){
                let filtroN=[]
                pacientes.forEach(element=>{
                    if(element.persona.name.toLowerCase().includes(value.toLowerCase()) || 
                    element.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                        filtroN.push(element)
                    }
                })
                if(!filtroN[0]){
                    filtroN.push("No se encontro paciente")
                }
                setBusquedaPaciente1(filtroN)
            }
            if(option==="dni"){
                let filtroN=[]
                pacientes.forEach(element=>{
                    if(element.persona.dni.toString().includes(value)){
                        filtroN.push(element)
                    }
                })
                if(!filtroN[0]){
                    filtroN.push("No se encontro DNI registrada")
                }
                setBusquedaPaciente1(filtroN)
            }
       
            
        }   
    }           

    const handleSelect=(event)=>{
        const { value }= event.target
        setOption(value)
        
    }
    return (
        <div className='input-buscador'>
        <FontAwesomeIcon icon={faSearch} className='icon-search'/>
        <input className='input-search' placeholder='Buscar paciente' value={input} onChange={(e)=>{handleChange(e)}}></input>
        <select onChange={(e) =>handleSelect(e)}>
            <option value="nombre">Nombre</option>
            <option value="dni">DNI</option>
        </select>
        </div>
    )
}

export default SearchPatient;