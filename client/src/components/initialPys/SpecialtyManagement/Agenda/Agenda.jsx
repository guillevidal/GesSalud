import React, {useState, useEffect} from "react";
import './Agenda.scss'
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Agenda({specialist, date, specialty, id, turnosPrecargados, turnos}) { 
    const [estado, setEstado]=useState({fecha: "fecha", especialista: "especialista", especialidad: "especialidad" })
    useEffect(()=> {
        if(turnos.length===turnosPrecargados.length){
            setEstado({fecha: "fecha2", especialista: "especialista2", especialidad: "especialidad2" })
        }
    })
    return(
        
        <tr className='datosAgenda'>
                <td className={`bloque ${estado.fecha}`}><span>{date}</span></td>
                
                <td className={`bloque ${estado.especialista}`} ><span >{specialist}</span></td>
                <td className={`bloque ${estado.especialidad}`}><span >{specialty}</span></td>
                <td className='bloque ver'>
                <Link to={`especialistaPys/agenda/${id}`}>
                <FontAwesomeIcon icon={faEye} className='boton'/>
                </Link>
                </td>
              
        </tr>
    )
}

export default Agenda;