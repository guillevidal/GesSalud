import { Link } from "react-router-dom"
import './Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { rol } from "../../actions"
import { Redirect } from "react-router"

export default function Nav(){

    const dispatch = useDispatch();

    const status = useSelector(state => state.rol);

    const logout = (e) => {
        e.preventDefault()

        dispatch(rol(''))
    }

    return(
        <div className='nav-bar'>

            {status === '' && <Redirect to='/' />}

            <div className='nav-elementos'>
            {status === '1' &&
                <div className='nav-link'>
                    <Link to='/patientPys' className='nav-link-ok' >Pacientes</Link>
                    <Link to='/turnoPys' className='nav-link-ok' >Turnos</Link>
                    <Link to='/especialistaPys' className='nav-link-ok' >Especialistas</Link>
                    <Link to='/consultorioPys' className='nav-link-ok' >Consultorios</Link>
                </div>
            }
                <div  className='nav-logo'>
                    <FontAwesomeIcon icon={faClinicMedical} className='nav-logo-icon'/>
                    <span className='nav-logo-text'>GesSalud</span>
                </div>
                <div  className='nav-exit'>
                    <div className='nav-exit-conjunto'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/>
                    <Link onClick={e => logout(e)} className='nav-exit-link'>Salir</Link>
                    </div>
                </div>

            </div>
            
        </div>        
    )
}