/* eslint-disable */
import React, {useState} from 'react'
// import { useSelector } from "react-redux";
import Card from './Card';

export default function Cards() {
    const [actual, setActual] = useState(1);
    // const espec = useSelector((state) => state.especialistas);

    let espec = [];
    for(let i = 0; i < 10; i++){
        
        espec.push({
            
            id: i+1,
            name: 'Name ' + i,
            lastName: 'Apellido ' + i,
            especialidad: 'medico ' + i,
        })
    }
    let size = 6;
    let totalPages = espec?.length>0 && Math.ceil(espec.length / size);
    let medicos;
   
    let previous = actual - 1;
    let next = actual + 1

    if(totalPages > 1){
       medicos = espec.slice(
        size * (actual - 1),
        size * (actual - 1) + size
       ) 
    } else {
        medicos = espec;
    }
 
    function handlePage(e) {
       
        setActual(Number(e.target.value));
        
    }
   
    return (
        <div>
            <div>
            {
                medicos?.map(el => {
                    return (  
                    <div key={el.id}>                        
                        <Card  id={el.id} name={el.name} lastName={el.lastName} especialidad={el.especialidad} />                       
                    </div>    
                )})
            }
            </div>

            <nav>
           
                <button onClick={e => {handlePage(e)}} value={previous} disabled={actual===1} >⏪ </button>    
                <h4>Page {actual}</h4>              
                <button onClick={e => {handlePage(e)}} value={next} disabled={actual === totalPages || !totalPages }> ⏩</button>
          
            </nav>
        </div>
        
    )
}
