/* eslint-disable */
import { useDispatch, useSelector } from "react-redux"

import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'

export default function HomeSpecialist(){

    const dispatch = useDispatch()
    let rol = useSelector(state => state.rol)

    return(
        <div className='homeSpecialist'>
            <Nav />
            <h1>ACA VA ESTAR LA AGENDA</h1>
        </div>
    )

}