import { Link } from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

export default function Nav(){



    return(
        <div className='navBar'>

            <div>
                <div>
                    <Link to='/1'>Opcion de permiso 1</Link>
                    <Link to='/2'>Opcion de permiso 2</Link>
                    <Link to='/3'>Opcion de permiso 3</Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faClinicMedical} />
                    <span>GesSalud</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <Link to='/logout'>Salir</Link>
                </div>

            </div>
            
        </div>        
    )
}