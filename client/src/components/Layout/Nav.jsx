/* eslint-disable */
import { Link } from "react-router-dom"
import './Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt, faListUl, faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { rol, resetearPacienteCreado, resetearEspecialistaCreado,
    resetearPacienteDetallado, resetearEspecialistaDetallado,
    resetearBusquedaPaciente, resetearBusquedaEspecialista,
    resetearPacientes, resetearEspecialistas, resetearModificado,
    resetearAdministrativos, resetearAdministrativoCreado, resetearAdministrativoDetallado,
    resetearBusquedaAdministrativo, resetearAgendaCreada, 
    resetearAgendas, resetearTurnos, resetearTurnoCreado, 
    resetearEspecialidades,
    resetearTurnoDetallado, resetearDiagnostico} from "../../actions"
import { Redirect } from "react-router"
import { useState } from "react"

export default function Nav(){

    const dispatch = useDispatch();

    const [mobile, setMobile] = useState(false);

    const status = useSelector(state => state.rol);

    const logout =  (e) => {
        e.preventDefault()
        
        dispatch(rol(''))
         localStorage.clear();
        dispatch(resetearPacienteCreado())
        dispatch(resetearPacienteDetallado())
        dispatch(resetearEspecialistaCreado())
        dispatch(resetearEspecialistaDetallado())
        dispatch(resetearBusquedaPaciente())
        dispatch(resetearBusquedaEspecialista())
        dispatch(resetearEspecialistas())
        dispatch(resetearPacientes())
        dispatch(resetearModificado())
        dispatch(resetearAdministrativoDetallado())
        dispatch(resetearAdministrativoCreado())
        dispatch(resetearAdministrativos())
        dispatch(resetearBusquedaAdministrativo())
        dispatch(resetearAgendaCreada())
        dispatch(resetearAgendas())
        dispatch(resetearTurnos())
        dispatch(resetearTurnoCreado())
        dispatch(resetearTurnoDetallado())
        dispatch(resetearDiagnostico())
        dispatch(resetearEspecialidades())
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
        dispatch(resetearAdministrativoDetallado())
        dispatch(resetearAdministrativoCreado())
        dispatch(resetearAdministrativos())
        dispatch(resetearEspecialidades())
    }

    const changeRol = (e) =>{
        e.preventDefault()
        dispatch(rol('5'))
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
        <>
        <div className='nav-bar'>
            <div className='menu-browser'>
            <div className='nav-elementos'>
                <div className='boton'>
                <button onClick={e => responsive(e)} className='boton-responsivo'><FontAwesomeIcon icon={faListUl} className='icon'/></button>
                </div>
            {(status === '1' || status === '6') &&
                <div className='nav-link'>
                    <Link onClick={handleResetActionsRol1}to='/patientPys' className='nav-link-ok' >Pacientes</Link>
                    <Link to='/turnoPys' className='nav-link-ok' >Turnos</Link>
                    <Link to='/especialistaPys' className='nav-link-ok' >Agendas</Link>
               </div>
            }
            {(status === '2' || status === '7') &&
                <div className='nav-link'>
                    <Link onClick={handleResetActionsRol2} to='/homeRRHH' className='nav-link-ok' >Empleados</Link>
                    <Link to='/createEmployee' className='nav-link-ok' >Crear Empleado</Link>
                </div>
            }
            {(status === '3' || status === '4') &&
                <div className='nav-link'>
                    <Link to='/homeUser' className='nav-link-ok' >Home</Link>
                    <Link to='/perfilUser' className='nav-link-ok' >Perfil</Link>
               </div>
            }
            
                <div  className={status === '5' ? 'nav-logo-5' : 'nav-logo'}>
                    <FontAwesomeIcon icon={faClinicMedical} className='nav-logo-icon'/>
                    <span className='nav-logo-text'>GesSalud</span>
                </div>
                <div  className='nav-exit'>
                {(status === '6' || status === '7') && 
                    <div className='nav-exit-conjunto'>
                    <button  onClick={e => changeRol(e)} className='nav-exit-link'>
                    <FontAwesomeIcon icon={faExchangeAlt} className='nav-exit-icon'/>Cambiar permisos</button>
                </div>
            }
                    <div className='nav-exit-conjunto'>
                    <button  onClick={e => logout(e)} className='nav-exit-link'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/>Salir</button>
                    </div>
                </div>
            </div>
            </div>

            {mobile && (status === '1' || status === '6') &&
                    <div className='nav-link-mobile'>
                        <Link onClick={handleResetActionsRol1}to='/patientPys' className='nav-link-ok-mobile' >Pacientes</Link>
                        <Link to='/turnoPys' className='nav-link-ok-mobile' >Turnos</Link>
                        <Link to='/especialistaPys' className='nav-link-ok-mobile' >Agenda</Link>
                        {(status === '6' || status === '7') &&
                     <div  onClick={e => changeRol(e)} className='nav-link-ok-mobile'>
                     <FontAwesomeIcon icon={faExchangeAlt} className='nav-exit-icon'/>
                     <span>Cambiar permisos</span>
                     </div>}
                        <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt}/><span>  Salir</span>
                        </div>
                        </div>}
                
                    {mobile && (status === '2' || status === '7') &&
                    <div className='nav-link-mobile'>
                        <Link onClick={handleResetActionsRol2} to='/homeRRHH' className='nav-link-ok-mobile' >Empleados</Link>
                        <Link to='/createEmployee' className='nav-link-ok-mobile' >Crear Empleado</Link>
                        {(status === '6' || status === '7') &&
                     <div  onClick={e => changeRol(e)} className='nav-link-ok-mobile'>
                     <FontAwesomeIcon icon={faExchangeAlt} className='nav-exit-icon'/>
                     <span>Cambiar permisos</span>
                     </div>}
                        <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt}/><span>  Salir</span>
                        </div>
                    </div>
                    }
                    {mobile && (status === '3' || status === '4') &&
                    <div className='nav-link-mobile'>
                        <Link to='/homeUser' className='nav-link-ok-mobile' >Home</Link>
                    <Link to='/perfilUser' className='nav-link-ok-mobile' >Perfil</Link>
                    <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/><span>  Salir</span>
                        </div>
                    </div>
                    
                    }
                     {mobile &&  status === '5' &&
                    <div className='nav-link-mobile'>
                   <div className='nav-link-ok-mobile' onClick={e => logout(e)}>
                         <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/><span>  Salir</span>
                        </div>
                    </div>
                    
                    }
                    
                        
               
               
            
            
        </div>     

        </>   
    )
}