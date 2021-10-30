import React from "react";
import './Agenda.scss'
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Agenda({specialist, date, specialty, id}) { 
    return(
        
        <tr className='datosAgenda'>
                <td className='bloque fecha'><span>{date}</span></td>
                
                <td className='bloque especialista' ><span >{specialist}</span></td>
                <td className='bloque especialidad'><span >{specialty}</span></td>
                <td className='bloque ver'>
                <Link to={`especialistaPys/agenda/${id}`}>
                <FontAwesomeIcon icon={faEye} className='boton'/>
                </Link>
                </td>
              
        </tr>
    )
}

export default Agenda;