import React, { useState}from "react";
import {useDispatch} from "react-redux";
import { administrativoDetallado } from "../../actions";
import {Redirect} from "react-router-dom";

const CardAdmin = (props) => {
    const [re, setRe] = useState({ details: false, edit: false })
    const dispatch = useDispatch();


    const { id, personaId, persona, status } = props.e

    const handleDetails = async () => {
        await dispatch(administrativoDetallado(id))
        setRe({ details: true, edit: false })
    }
    const handleEdit = async () => {
        await dispatch(administrativoDetallado(id))
        setRe({ details: false, edit: true })
    }

    return (
        <div className='card-especialista'>
            <div className='datos-principales'>

                <span className='nombre-apellido'>{persona.name.charAt(0).toUpperCase() + persona.name.slice(1) + " " + persona.lastName.charAt(0).toUpperCase() + persona.lastName.slice(1)}</span>
                {persona.rol==="1" && <span className='especialidad'>Area: {' ' + "Planeacion y Servicios"}</span>}
                {persona.rol==="2" && <span className='especialidad'>Area: {' ' + "Recursos Humanos"}</span>}
                {status && <span className='dni'>Estado: {' ' + "Activo"}</span>}
                {!status && <span className='dni'>Estado: {' ' + "No activo"}</span>}

            </div>

            <div className='links'>
                {re.details && <Redirect to={`/detailAdmin`} />}
                {re.edit && <Redirect to={`/adminEdit`} />}
                <button className='enlace' onClick={handleDetails} >
                    Ver mas
                </button>
                <button className='enlace' onClick={handleEdit}>
                    Modificar
                </button>
            </div>

        </div>
    )}

export default CardAdmin