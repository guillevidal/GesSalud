import React, {useEffect} from "react"
import {Link} from "react-router-dom";
import "./initialPys.scss";
import { useDispatch } from 'react-redux'
import {obtenerPacientes} from "../../actions/index.js";

const InitialPys = () => {
    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(obtenerPacientes())
    })

    return (
        <div id="initialPys-container">
            <Link to="patientPys">
                <div className="module-container">
                    <h1>Gestion de paciente</h1>
                </div>
            </Link>

            <Link to="turnoPys">
                <div className="module-container">
                    <h1>Gestion de turno</h1>
                </div>
            </Link>

            <Link to="agendaPys">    
                <div className="module-container">
                    <h1>Gestion de agenda medica</h1>
                </div>
            </Link>

            <Link to="consultorioPys">
                <div className="module-container">
                    <h1>Gestion de consultorio</h1>
                </div>
            </Link>
        </div>
    )
}
export default InitialPys