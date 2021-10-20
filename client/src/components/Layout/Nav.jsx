import { Link } from "react-router-dom"
import './Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt, faListUl} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { rol, resetearPacienteCreado, resetearEspecialistaCreado,
    resetearPacienteDetallado, resetearEspecialistaDetallado,
    resetearBusquedaPaciente, resetearBusquedaEspecialista,
    resetearPacientes, resetearEspecialistas, resetearModificado} from "../../actions"
import { Redirect } from "react-router"
import { useState } from "react"

export default function Nav(){

    const dispatch = useDispatch();

    const [mobile, setMobile] = useState(false);

    const status = useSelector(state => state.rol);

    const logout = async (e) => {
        e.preventDefault()
        await dispatch(rol(''))
        dispatch(resetearPacienteCreado())
        dispatch(resetearPacienteDetallado())
        dispatch(resetearEspecialistaCreado())
        dispatch(resetearEspecialistaDetallado())
        dispatch(resetearBusquedaPaciente())
        dispatch(resetearBusquedaEspecialista())
        dispatch(resetearEspecialistas())
        dispatch(resetearPacientes())
        dispatch(resetearModificado())
    }

    const handleResetActionsRol1 = () => {
        dispatch(resetearPacienteCreado())
        dispatch(resetearPacienteDetallado())
        dispatch(resetearBusquedaPaciente())
        dispatch(resetearModificado())
    }

    const handleResetActionsRol2 = () => {
        dispatch(resetearEspecialistaCreado())
        dispatch(resetearEspecialistaDetallado())
        dispatch(resetearBusquedaEspecialista())
        dispatch(resetearModificado())
    }

    const responsive = (e) =>{
        e.preventDefault()

        if(mobile === false){
            setMobile(true)
        }
        else{
            setMobile(false)
        }

    }   

    return(
        <div className='nav-bar'>

            {status === '' && <Redirect to='/' />}
            <div className='menu-browser'>
            <div className='nav-elementos'>
                <div className='boton'>
                <button onClick={e => responsive(e)} className='boton-responsivo'><FontAwesomeIcon icon={faListUl} className='icon'/></button>
                </div>
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
            {status === '3' &&
                <div className='nav-link'>
                    <Link onClick={handleResetActionsRol1}to='/patientPys' className='nav-link-ok' >Pacientes</Link>
                    <Link to='/perfilEspecialista' className='nav-link-ok' >Perfil</Link>
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

            {mobile && status === '1' &&
                    <div className='nav-link-mobile'>
                        <Link onClick={handleResetActionsRol1}to='/patientPys' className='nav-link-ok-mobile' >Pacientes</Link>
                        <Link to='/turnoPys' className='nav-link-ok-mobile' >Turnos</Link>
                        <Link to='/especialistaPys' className='nav-link-ok-mobile' >Especialistas</Link>
                        <Link to='/consultorioPys' className='nav-link-ok-mobile' >Consultorios</Link>
                        <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt}/><span>  Salir</span>
                        </div>
                        </div>}
                
                    {mobile && status === '2' &&
                    <div className='nav-link-mobile'>
                        <Link onClick={handleResetActionsRol2} to='/homeRRHH' className='nav-link-ok-mobile' >Home</Link>
                        <Link to='/createSpecialist' className='nav-link-ok-mobile' >Crear Especialista</Link>
                        <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt}/><span>  Salir</span>
                        </div>
                    </div>
                }
            
        </div>        
    )
}