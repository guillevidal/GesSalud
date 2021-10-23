/* eslint-disable */
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { especialistaDetallado } from "../../actions"
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'

export default function HomeSpecialist(){

    const dispatch = useDispatch()

    useEffect(()=>{
         dispatch(especialistaDetallado(1))
    },[])

    return(
        <div className='homeSpecialist'>
            <Nav />
            <h1>ACA VA ESTAR LA AGENDA</h1>
        </div>
    )

}