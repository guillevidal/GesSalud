import React from "react";

const PatientCard = ({name, lastName, dni, email, phone, adress, birth , user, password, hc,
    medicacion, contactos_emergencia, enfermedades }) => {
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
        </div>
    )
}

export default PatientCard;