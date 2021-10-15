import './Landing'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faUserMd} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Landing(){

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        user : null,
        pass : null
    })

    const handleChange = (e) => {
        e.preventDefault()

        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
    }

    const handleSubmit = (e) => {

        e.preventDefault()


    }

    return(
        <div id='landing-container'>
            <div id='landing-header'>
                <div id='landing-title'>
                    <FontAwesomeIcon icon={faClinicMedical} className='icon-salud' />
                    <span className='landing-title-text'>GesSalud</span>
                </div>
            </div>
            
                <div id='landing-login'>

                        <form className='landing-form'>
                             <FontAwesomeIcon icon={faUserMd} className='icon-login' />
                            <label htmlFor="" className='form-title'>Iniciar Sesión</label>
                            <div className='landing-form-inputs'>
                                <div className='label-input'>
                                    <label htmlFor="" className='label'>Usuario</label>
                                    <input type="text" name='user' value={input.user} className='input' onChange={e => handleChange(e)}/>
                                </div>
                                <div className='label-input'>
                                    <label htmlFor="" className='label'>Contraseña</label>
                                    <input type="password" name='pass' value={input.pass} className='input' onChange={e => handleChange(e)}/>                   
                                </div>
                            </div>
                            <button className='boton-login' onClick={e => handleSubmit(e)}>Ingresar</button>
                        </form>

                </div>

        </div>
    )

} 