/* eslint-disable */
import React, { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { obtenerAdministrativos, paginado} from "../../actions/index.js"
import './SearchEspecialista.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchEspecialist = ({setBusquedaAdministrativo2}) => {
    const dispatch= useDispatch();
    const administrativos=useSelector(state => state.administrativos)
    const [input, setInput]= useState("")
    const [option, setOption]= useState("todos")

    const handleChange = (e) => {    
        const { value} = e.target
        dispatch(paginado(0))
        setInput(value)
        if(e.target.value.length===0){
            if(option==="todos"){
                dispatch(obtenerAdministrativos())
                setBusquedaAdministrativo2([])

            }
            if(option==="pys"){
                setBusquedaAdministrativo2(administrativos.filter(element =>  element.persona.rol==="1"))
            }
            if(option==="rrhh"){
                setBusquedaAdministrativo2(administrativos.filter(element =>  element.persona.rol==="2"))
            }
        }else {
            if(option==="pys"){
                let filtroA=administrativos.filter(element =>  element.persona.rol==="1")
                let filtroB=[]
                console.log(filtroA)
                filtroA.forEach(element=>{
                    if(element.persona.name.toLowerCase().includes(value.toLowerCase()) || 
                    element.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                        filtroB.push(element)
                    }
                })
                if(!filtroB[0]){
                    filtroB.push("No se encontro administrativo de PYS")
                }
                setBusquedaAdministrativo2(filtroB)
            }
            if(option==="rrhh"){
                let filtroA=administrativos.filter(element =>  element.persona.rol==="2")
                let filtroB=[]
                filtroA.forEach(element=>{
                    if(element.persona.name.toLowerCase().includes(value.toLowerCase()) || 
                    element.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                        filtroB.push(element)
                    }
                })
                if(!filtroB[0]){
                    filtroB.push("No se encontro administrativo de RRHH")
                }
                setBusquedaAdministrativo2(filtroB)
            }
            if(option==="todos"){
                let filtroC=[]
                administrativos.forEach(element=>{
                    if(element.persona.name.toLowerCase().includes(value.toLowerCase()) || 
                    element.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                        filtroC.push(element)
                    }
                })
                if(!filtroC[0]){
                    filtroC.push("No se encontraron administrativos")
                }
                setBusquedaAdministrativo2(filtroC)
            }
        }
    }

const handleSelect = (event)=>{
    const {value} = event.target
    if(value==="todos"){
        setOption(value)
        setBusquedaAdministrativo2([])
    }
    if(value==="pys"){
        setOption(value)
        setBusquedaAdministrativo2(administrativos.filter(element =>  element.persona.rol==="1"))
    }
    if(value==="rrhh"){
        setOption(value)
        setBusquedaAdministrativo2(administrativos.filter(element =>  element.persona.rol==="2"))
    }
}

    return (
        <div className='buscador-especialista'>
            <div className='elementos-buscador-admin'>
                
            <FontAwesomeIcon icon={faSearch} className='icon-search'/>
           
            <input className='input-buscador' type="text" placeholder="Buscar Administrativo" onChange={(e)=>handleChange(e)} value={input}/>
            
            <select onChange={(e)=>handleSelect(e)} className='select-buscador'>
                <option value="todos">Todos</option>
                <option value="pys">PyS</option>
                <option value="rrhh">RRHH</option>
            </select>
            </div>
           
        </div>
    )
}

export default SearchEspecialist;