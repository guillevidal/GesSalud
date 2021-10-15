import { Link } from "react-router-dom"
import './Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

export default function Nav(){


    return(
        <div className='nav-bar'>

            <div className='nav-elementos'>
                <div className='nav-link'>
                    <Link to='/1' className='nav-link-ok'>Opcion 1</Link>
                    <Link to='/2' className='nav-link-ok'>Opcion 2</Link>
                    <Link to='/3' className='nav-link-ok'>Opcion 3</Link>
                </div>
                <div  className='nav-logo'>
                    <FontAwesomeIcon icon={faClinicMedical} className='nav-logo-icon'/>
                    <span className='nav-logo-text'>GesSalud</span>
                </div>
                <div  className='nav-exit'>
                    <div className='nav-exit-conjunto'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-exit-icon'/>
                    <Link to='/logout' className='nav-exit-link'>Salir</Link>
                    </div>
                </div>

            </div>
            
        </div>        
    )
}