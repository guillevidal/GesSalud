import './Landing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClinicMedical, faExclamationTriangle, faDizzy } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
export default function NotFound(){

  const back = useHistory()
    
    return(
        <div className='pageError'>

        <div id="landing-header">
        <div id="landing-title">
          <FontAwesomeIcon icon={faClinicMedical} className="icon-salud" />
          <span className="landing-title-text">GesSalud</span>
        </div>
      </div>

      <div className='icon'>
      <FontAwesomeIcon icon={faExclamationTriangle} className="icon-error" />
      <h2 className='title'>Página no encontrada <FontAwesomeIcon icon={faDizzy} className='dizzy'/></h2>
      <span className='detail'>Lamentablemente no encontramos acceso a esta ruta, puedes volver atrás y continuar navegando en nuestra aplicación.</span>
      
        <div className='BOTONES'><button className='vuelta' onClick={() => back.goBack()}>Volver</button>
        <Link to='/'><button className='vuelta' >Página principal</button></Link></div>
      </div>

        </div>
    )
}