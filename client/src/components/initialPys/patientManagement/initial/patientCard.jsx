import React from "react";
import {Link} from "react-router-dom";
import PatientCardDetails from "./patietCardDetails";

const PatientCard = ({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
    medicacion, contactos_emergencia, enfermedades, setDetails, details }) => {
    return (
        <>
        <div>
            <p>nombre: {name}</p>
            <p>apellido: {lastName}</p>
            <p>dni: {dni}</p>
            <button onClick={() => !details?setDetails(true):setDetails(false)}>{details?"Ver menos":"Ver mas"}</button>         
        </div>:
        </>

    )
}
    
export default PatientCard;

{/* <div>
<p>nombre: {name}</p>
<p>apellido: {lastName}</p>
<p>dni: {dni}</p>
<button onClick={() => setDetails(true)}>Ver mas</button>
</div> */}