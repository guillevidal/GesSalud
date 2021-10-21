import Nav from "../Layout/Nav"
import './ProfileSpecialist.scss'
import Person from "../forms/Person/Person"
import { useSelector } from "react-redux"

export default function ProfileSpecialist(){

    const especialista = useSelector(state => state.especialistaDetallado)

    const mayus = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return(
        <div className='ProfileSpecialist'>
            <Nav />

            <div className='card-profile'>
                
                <div className='encabezado'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" alt="" className='imagen'/>
                    <span className='nombre'>{mayus(especialista[0].persona.name) + ' ' + mayus(especialista[0].persona.lastName)}</span>
                    <span className='especialidad'>{especialista[0].specialty}</span>
                </div> 

                <div className='informacion'>
                <div className='info'>
                    <span className='info-title'>Información profesional</span>
                    <div className='data'><span>Dni: </span><span className='data-real'>{especialista[0].persona.dni}</span></div>
                    <div className='data'><span>N° de legajo: </span><span className='data-real'>{especialista[0].enrollment}</span></div>
                    <div className='data'><span>Fecha de nacimiento: </span><span className='data-real'>{especialista[0].persona.birth}</span></div>
                </div>
                <div className='info'>
                <span className='info-title'>Información personal</span>
                    <div className='data'><span>Telefono: </span><span className='data-real'>{especialista[0].persona.phone}</span></div>
                    <div className='data'><span>Email: </span><span className='data-real'>{especialista[0].persona.email}</span></div>
                    <div className='data'><span>Dirección: </span><span className='data-real'>{especialista[0].persona.adress}</span></div>
                </div>
                </div>
            </div>

        </div>
    )

}