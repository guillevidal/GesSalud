import React from "react";
import Nav from "../Layout/Nav.jsx"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
const PagoRealizado = () => {
    const rol = useSelector(state => state.rol)
    return (
        <div>
            <Nav/>
            <h1>Su pago fue realizado con exito</h1>
            {rol === "1" || rol === "6" && <Link to="/turnoPys"><button>Regresar</button></Link>}
            {rol === "4" && <Link to="/homeUser"><button>Regresar</button></Link>}
        </div>
    )
}
export default PagoRealizado