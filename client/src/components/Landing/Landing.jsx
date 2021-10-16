import './Landing'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClinicMedical,faUserMd} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rol } from '../../actions'
import { Redirect } from 'react-router-dom'


export default function Landing(){

    const dispatch = useDispatch()
    const status = useSelector(state => state.rol);

    const [input, setInput] = useState({
        user : '',
        pass : ''
    })

    const handleChange = (e) => {
        e.preventDefault()

        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

       await dispatch(rol(input.user))

    }

    return(
        <div id='landing-container'>
            { status === '1' && <Redirect to ='/initialPys' />}
            { status === '2' && <Redirect to ='/homeRRHH' />}
            
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