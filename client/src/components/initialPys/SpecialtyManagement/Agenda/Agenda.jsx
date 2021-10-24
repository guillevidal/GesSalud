import React from "react";

function Agenda({specialist, date, specialty, turno, hour}) { 
    return(
        
        <div>
            <div>
                <h4>{date}</h4>
            </div>
            <div>
                <p>{hour}</p>
                <p>{specialist}</p>
                <p>{specialty}</p>
                <p>{turno}</p>
            </div>
        </div>
    )
}

export default Agenda;