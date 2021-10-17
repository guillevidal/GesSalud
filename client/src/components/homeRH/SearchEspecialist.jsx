import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {obtenerEspecialistaPorEspecialidad, obtenerEspecialistaPorNombre, obtenerEspecialistas,
    resetearBusquedaEspecialista} from "../../actions/index.js"

const SearchEspecialist = () => {
    const dispatch= useDispatch();
    const [input, setInput] = useState({value: "", option: "nombre"});


    const handleChange = (e) => {    
        
        if(e.target.value.length===0){
            setInput({...input, value: e.target.value})
            dispatch(resetearBusquedaEspecialista())
            dispatch(obtenerEspecialistas())

        }else if (input.option==="nombre"){
            setInput({...input, value: e.target.value})
            dispatch(obtenerEspecialistaPorNombre(e.target.value))

        }else if(input.option==="especialidad"){
            setInput({...input, value: e.target.value})
            dispatch(obtenerEspecialistaPorEspecialidad(e.target.value))
        }
    }

    const handleSelect = (e) => {
        setInput({...input, option: e.target.value})
    }

    return (
        <div>
            <input type="text" placeholder="Buscar especialista" onChange={(e)=>handleChange(e)} value={input.value}/>
            <select onClick={(e) => {handleSelect(e)}}>
                <option value={"nombre"}>Por nombre</option>
                <option value={"especialidad"} disabled>Por especialidad</option>
            </select>
        </div>
    )
}

export default SearchEspecialist;