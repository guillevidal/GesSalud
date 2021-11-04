import React, {useState, useEffect} from "react";
import Checkout from "./SDK-MercadoPago.jsx"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router"
import { enviarPago } from "../../../actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './carro.scss'
import ImagenMP from '../../Landing/images/mercadopago.png'


const CarroCompras = ({carro, setCarro})=> {
    const dispatch= useDispatch();
    const li = useSelector( state => state.enlace_de_pago)
    const [x, setX]= useState(false)
    
   
    const handleSubmit = async() => {   
        await dispatch(enviarPago(carro))
        await setX(true)
       
    }
    const handleRedirect = () => {
        if(x){
            setTimeout(() => {
            window.location.href = li
            setX(false)
        }, 1000);
        }
    }
    handleRedirect()
    return (
        <div className='containerMP'>
            <span className='titulo'>Carrito</span>
            <div className='listas'>
            {!carro.items[0]
            ?
            <span className='vacio'><FontAwesomeIcon icon={faTimesCircle}/> No han añadido turnos para pagar</span>:
            carro.items.map(item => {
              
                return (
                    <div className='lista'>
                        <span className='data'>Especialidad: {item.title} </span>
                        <span className='data'>Precio: {item.unit_price}</span>
                        <span className='data'>Cantidad: {item.quantity}</span>
                    </div>
                )
            })}
           </div>
           {carro.items[0] && !x?<button onClick={()=>handleSubmit()} className='boton'><img src={ImagenMP} className='imgmp'/></button>: <h5>En breve sera redireccionado</h5>}
        

            
        </div>
    )
}

export default CarroCompras;