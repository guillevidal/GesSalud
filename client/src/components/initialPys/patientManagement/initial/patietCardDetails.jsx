import React from "react";

const PatientCardDetails = ({id, name, lastName, dni, email, phone, adress, birth , user, password, hc,
    medicacion, contactos_emergencia, enfermedades, setDetails}) => {
    return (
        <div>
            <p>{name}</p>
            <p>{lastName}</p>
            <p>{dni}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{adress}</p>
            <p>{birth}</p>
            <p>{user}</p>
            <p>{password}</p>
            <p>{hc}</p>
            <p>{medicacion}</p>
            <p>{contactos_emergencia}</p>
            <p>{enfermedades}</p>
            <button onClick={() => setDetails(false)}>Ver menos</button>
        </div>
    )
}

export default PatientCardDetails