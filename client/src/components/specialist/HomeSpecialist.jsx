import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { especialistaDetallado, obtenerEspecialistas } from "../../actions"
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'

export default function HomeSpecialist(){

    const dispatch = useDispatch()

    useEffect(async()=>{
        await dispatch(obtenerEspecialistas())
        await dispatch(especialistaDetallado(1))
    },[])

    return(
        <div className='homeSpecialist'>
            <Nav />
            <h1>ACA VA ESTAR LA AGENDA</h1>
        </div>
    )

}