import React from "react";
import {Link} from "react-router-dom";
import { useDispatch} from "react-redux";
import {pacienteDetallado} from "../../../../actions/index.js";

const PatientCard = ({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
    medicacion, contactos_emergencia, enfermedades }) => {

    const dispatch = useDispatch()    
    return (
        <div>          
            <p>nombre: {name}</p>
            <p>apellido: {lastName}</p>
            <p>dni: {dni}</p>
            <Link to="/patientDetails" onClick={()=>{dispatch(pacienteDetallado(id))}}><button>Ver mas</button></Link>
            <Link to="/patientEdit"><button>Editar info</button></Link>
        </div>
        
    )
}
    
export default PatientCard;
