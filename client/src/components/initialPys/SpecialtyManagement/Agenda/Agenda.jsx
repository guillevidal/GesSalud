import React from "react";

function Agenda({specialist, date, specialty}) { 
    return(
        
        <div>
            <div>
                <h4>{date}</h4>
            </div>
            <div>
                
                <p>{specialist}</p>
                <p>{specialty}</p>
              
            </div>
        </div>
    )
}

export default Agenda;