import React from "react";
import "./EditAgenda.scss";
import { Link } from "react-router-dom";


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF }) => {

    return (
        <tr className='lista'>
        
            <td className='td numero'><span >{numeroTurno}</span></td>
            <td className='td horario'><span >{horaI}</span></td>
            <td className='td horarioFinal'><span>{horaF}</span></td>
            <td className='td paciente'><span >{"no asignado"}</span></td>
            <td className='td historia'><span >{"no disponible"}</span></td>
            
            <Link to='/agendar' className='link'>
            <td className='td asignar'>    
                Asignar turno
                
            </td>
            
            </Link>
        </tr>
    )
}

export default TurnosAgendaCard