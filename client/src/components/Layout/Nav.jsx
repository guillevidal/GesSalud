import { Link } from "react-router-dom"
import './Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { rol, resetearPacienteCreado, resetearEspecialistaCreado,
    resetearPacienteDetallado, resetearEspecialistaDetallado,
    resetearBusquedaPaciente, resetearBusquedaEspecialista,
    resetearPacientes, resetearEspecialistas  } from "../../actions"
import { Redirect } from "react-router"

export default function Nav(){

    const dispatch = useDispatch();

    const status = useSelector(state => state.rol);

    const logout = (e) => {
        e.preventDefault()
        dispatch(rol(''))
        dispatch(resetearPacienteCreado())
        dispatch(resetearPacienteDetallado())
        dispatch(resetearEspecialistaCreado())
        dispatch(resetearEspecialistaDetallado())
        dispatch(resetearBusquedaPaciente())
        dispatch(resetearBusquedaEspecialista())
        dispatch(resetearEspecialistas())
        dispatch(resetearPacientes())
    }

    const handleResetActionsRol1 = () => {
        dispatch(resetearPacienteCreado())
        dispatch(resetearPacienteDetallado())
    }

    const handleResetActionsRol2 = () => {
        dispatch(resetearEspecialistaCreado())
        dispatch(resetearEspecialistaDetallado())
    }
    return(
        <div className='nav-bar'>

            {status === '' && <Redirect to='/' />}

            <div className='nav-elementos'>
            {status === '1' &&
                <div className='nav-link'>
                    <Link onClick={handleResetActionsRol1}to='/patientPys' className='nav-link-ok' >Pacientes</Link>
                    <Link to='/turnoPys' className='nav-link-ok' >Turnos</Link>
                    <Link to='/especialistaPys' className='nav-link-ok' >Especialistas</Link>
                    <Link to='/consultorioPys' className='nav-link-ok' >Consultorios</Link>
                </div>
            }
            {status === '2' &&
                <div className='nav-link'>
                    <Link onClick={handleResetActionsRol2} to='/homeRRHH' className='nav-link-ok' >Home</Link>
                    <Link to='/createSpecialist' className='nav-link-ok' >Crear Especialista</Link>
                </div>
            }
                <div  className='nav-logo'>
                    <FontAwesomeIcon icon={faClinicMedical} className='nav-logo-icon'/>
                    <span className='nav-logo-text'>GesSalud</span>
                </div>
                <div  className='nav-exit'>
                    <div className='nav-exit-conjunto'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/>
                    <button  onClick={e => logout(e)} className='nav-exit-link'>Salir</button>
                    </div>
                </div>

            </div>
            
        </div>        
    )
}