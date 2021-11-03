import React, { useState} from "react";
import Checkout from "./SDK-MercadoPago.jsx"
import {useDispatch, useSelector} from "react-redux"
import { enviarPago } from "../../../actions/index.js";

const CarroCompras = ({carro, setCarro})=> {
    const dispatch= useDispatch();
    const li = useSelector( state => state.creado)
    const [x, setX]= useState(false)
    
    const handleSubmit = async() => {   
        await dispatch(enviarPago(carro))
        setX(true)
    }
    
    return (
        <div>
            <h1>Carrito</h1>
            {!carro.items[0]
            ?
            <h3>No han añadido turnos para pagar</h3>:
            carro.items.map(item => {
                return (
                    <div>
                        <h5>Especialidad: {item.title} </h5>
                        <h5>Precio: {item.unit_price}</h5>
                        <h5>Cantidad: {item.quantity}</h5>
                    </div>
                )
            })}
            {carro.items[0] && !x?<button  onClick={()=>handleSubmit()}>Pagar</button>: <a href={li}>Link habilitado</a>}
            
            
        </div>
    )
}

export default CarroCompras;