import { useDispatch, useSelector } from "react-redux"
import Nav from "../Layout/Nav"
import { Redirect } from "react-router-dom";
import { rol } from "../../actions";
import './LandingAdmin.scss'

export default function LandingAdmin(){

    const dispatch = useDispatch();
    const status = useSelector(state => state.rol)

    const handleRol = (roles) => {
        dispatch(rol(roles))
    }

    return(
        <div className='container-admin'>
             {status === "6" && <Redirect to="/patientPys" />}
            {status === "7" && <Redirect to="/homeRRHH" />}
            <Nav />

            <div className='opciones'>
            
            <button onClick={e => handleRol('7')} className='boton'><span className='text'>RRHH</span></button> 
            <button onClick={e => handleRol('6')} className='boton'><span className='text'>PyS</span></button>

            </div>
        </div>
    )

}