import React from "react";
import Nav from "../Layout/Nav.jsx"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import './HomeSpecialist.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const PagoRealizado = () => {
    const rol = useSelector(state => state.rol)
    return (
        <div className='pagaddo'>
            <Nav/>
            <span className='check'><FontAwesomeIcon icon={faShoppingCart}/> Su pago fue realizado con exito</span>
            {rol === "1" || rol === "6" && <Link to="/turnoPys"><button className='button'>Regresar</button></Link>}
            {rol === "4" && <Link to="/homeUser"><button className='button'>Regresar</button></Link>}
        </div>
    )
}
export default PagoRealizado