import React from 'react'
import { Link } from "react-router-dom";

export default function Card({name, lastName, id, especialidad}) {

    const fullName = `${name} ${lastName}`

    return (
        <div>
            <div>
                <p>Nombre: </p>
                <h3>{fullName}</h3>
            </div>
            <div>
                <p>Especialidad: </p>
                <h3>{especialidad}</h3>
            </div>
            <div>
            <Link to={`/detailEspecialista/${id}`}>
                <h3>Detalle</h3>
            </Link>
            <Link to='/createSpecialist'>
                <h3>Modificar</h3>
            </Link>
            </div>
        </div>
    )
}
