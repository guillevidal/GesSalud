/* eslint-disable */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { especialistaDetallado, pacienteDetallado } from "../../actions"

import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'

export default function HomeSpecialist(){

    const dispatch = useDispatch()
    let rol = useSelector(state => state.rol)

    useEffect(()=>{

        if(rol === '3'){
          dispatch(especialistaDetallado(1));
        }
        else{
            dispatch(pacienteDetallado(41802066));
        }

    },[])

    return(
        <div className='homeSpecialist'>
            <Nav />
            <h1>ACA VA ESTAR LA AGENDA</h1>
        </div>
    )

}