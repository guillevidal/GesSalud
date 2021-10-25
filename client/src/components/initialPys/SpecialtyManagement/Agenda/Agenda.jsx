import React from "react";
import './Agenda.scss'

function Agenda({specialist, date, specialty}) { 
    return(
        
        <div className='datos'>
                <div className='bloque'><span className='fecha'>{date}</span></div>
                
                <div className='bloque'><span className='especialista'>{specialist}</span></div>
                <div className='bloque'><span className='especialidad'>{specialty}</span></div>
              
        </div>
    )
}

export default Agenda;