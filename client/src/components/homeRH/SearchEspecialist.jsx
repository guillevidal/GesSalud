/* eslint-disable */
import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {obtenerEspecialistaPorEspecialidad, obtenerEspecialistaPorNombre, obtenerEspecialistas,
    resetearBusquedaEspecialista, paginado} from "../../actions/index.js"
import './SearchEspecialista.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchEspecialist = ({empleados}) => {
    const dispatch= useDispatch();
    const [input, setInput] = useState({value: "", option: "nombre"});


    const handleChange = (e) => {    
        
        if(e.target.value.length===0){
            dispatch(paginado(0))
            setInput({...input, value: e.target.value})
            dispatch(resetearBusquedaEspecialista())
            dispatch(obtenerEspecialistas())

        }else if (input.option==="nombre"){
            dispatch(paginado(0))
            setInput({...input, value: e.target.value})
            dispatch(obtenerEspecialistaPorNombre(e.target.value))


        }else if(input.option==="especialidad"){
            dispatch(paginado(0))
            setInput({...input, value: e.target.value})
            dispatch(obtenerEspecialistaPorEspecialidad(e.target.value))
        }
    }

    const handleSelect = (e) => {
        setInput({...input, option: e.target.value})
    }

    return (
        <div className='buscador-especialista'>
            <div className='elementos-buscador'>
                
            <FontAwesomeIcon icon={faSearch} className='icon-search'/>
           
            <input className='input-buscador' type="text" placeholder="Buscar especialista" onChange={(e)=>handleChange(e)} value={input.value}/>
            <select className='select-buscador' onClick={(e) => {handleSelect(e)}}>
                <option value={"nombre"}>Por nombre</option>
                <option value={"especialidad"} disabled>Por especialidad</option>
            </select >
            </div>
           
        </div>
    )
}

export default SearchEspecialist;