import React from "react";

const CarroCompras = ({carro, setCarro})=> {
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
            {carro.items[0]?<button>Ir a pagar</button>: null}
        </div>
    )
}

export default CarroCompras;