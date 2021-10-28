/* eslint-disable */
import { useDispatch } from "react-redux"
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'
import axios  from "axios"
import { useEffect } from "react"
import { rol, especialistaDetallado, pacienteDetallado } from "../../actions"


export default function HomeSpecialist(){

    const dispatch = useDispatch()

    useEffect(()=>{

        let obtengoToken = localStorage.getItem('access-token')
        axios.get('/whoami', { 
         headers:  { 
            authorization : obtengoToken
          }
      })
      .then(res => {
        console.log(res.data)
        if(res.data.rol){
            dispatch(rol(res.data.rol))
    
          if(res.data.dni){
            dispatch(pacienteDetallado(res.data.dni))
          }
          if(res.data.especialistaId){
            dispatch(especialistaDetallado(res.data.especialistaId))
          }
    
        }
        else{
          return
        }
      }) 
        
     
    
       },[])  

    return(
        <div className='homeSpecialist'>
            <Nav />
            <h1>ACA VA ESTAR LA AGENDA</h1>
        </div>
    )

}