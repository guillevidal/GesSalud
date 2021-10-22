import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Nav from "../../Layout/Nav.jsx";
import CreateSpecialist from "../CreateSpecialist/CreateSpecialist.jsx";
import CreatePyS from "../CreatePys/CreatePys.jsx"
import CreateRRHH from "../CreateRRHH/CreateRRHH.jsx";

const CreateEmployee = () => {
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
            <option value="pys">Crear Productos y Servicios</option>
            <option value="rrhh">Crear Recursos Humanos</option>
        </select>

        {state === "especialista" && <CreateSpecialist/>}
        {state === "pys" && <CreatePyS/>}
        {state === "rrhh" && <CreateRRHH/> }
    </div>


)}

export default CreateEmployee;