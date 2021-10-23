/* eslint-disable */
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Nav from "../../Layout/Nav.jsx";
import CreateSpecialist from "../CreateSpecialist/CreateSpecialist.jsx";
import CreatePyS from "../CreatePys/CreatePys.jsx"
import CreateRRHH from "../CreateRRHH/CreateRRHH.jsx";
import {
    obtenerEspecialidades,
} from '../../../actions/index.js'
const CreateEmployee = () => {
    const dispatch=useDispatch()
    useEffect(()=>{ 
        dispatch(obtenerEspecialidades())

    })
    const [state, setState] = useState("especialista")

    const handleEmployee = (e) => {
        const {value}= e.target
        setState(value)
    }

    return (

    <div>
        <Nav />
        <select onChange={(e)=>handleEmployee(e)}>
            <option value="especialista">Crear Especialista</option>
            <option value="pys">Crear Planeacion y Servicios</option>
            <option value="rrhh">Crear Recursos Humanos</option>
        </select>

        {state === "especialista" && <CreateSpecialist/>}
        {state === "pys" && <CreatePyS/>}
        {state === "rrhh" && <CreateRRHH/> }
    </div>


)}

export default CreateEmployee;