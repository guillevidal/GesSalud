import React, {useEffect} from "react"
import {Link} from "react-router-dom";
import "./initialPys.scss";
import { useDispatch } from 'react-redux'
import {obtenerPacientes} from "../../actions/index.js";
import Nav from '../Layout/Nav.jsx';
const InitialPys = () => {
    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(obtenerPacientes())
    })

    return (
        
        <div id="initialPys-container">
            <Nav/>
        </div>
    
    )
}
export default InitialPys