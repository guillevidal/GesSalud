/* eslint-disable */
import Nav from "../Layout/Nav"
import './ProfileSpecialist.scss'
import { useSelector } from "react-redux"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

export default function ProfileSpecialist(){

    const especialista = useSelector(state => state.especialistaDetallado)

    const [editar, setEditar] = useState({
        imagen : false,
        datos : false,
        cuenta : false
    })

    const [datosEsp, setDatos] = useState({
        ...especialista[0].persona
    })

    const [newData, setNewData] = useState({
        ...especialista[0]
    })

    const [validaciones, setValidaciones] = useState(false)


    const mayus = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleClick = (e, op) =>  {

        e.preventDefault()

            
            setEditar({
                ...editar,
                [op] : true
            })

           if(op === 'imagen'){
            document.getElementById('upload').click()
           }
        

    }

    const handleChange = (e) =>{
       setDatos({
            ...datosEsp,
            [e.target.name] : e.target.value

        })

        if(e.target.name === 'passwordActual'){
            if(e.target.value !== especialista[0].persona.password){
                setValidaciones(true)
                return
            }
            else{
                setValidaciones(false)
                return
            }
        }

        setNewData({
            ...newData,
            persona : datosEsp
        })

       

    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        setEditar({
            imagen :false,
            datos : false
        })
    }

    const hardCodeo = (number) =>{
        
        let signos = ''

        for(let i=1; i<=number; i++){
            signos = signos + '*'
        }

        return signos
    }

    return(
        <div className='ProfileSpecialist'>
            <Nav />

            <div className='card-profile'>
                <div className='encabezado'>
                   <div className='image-label'><img src="https://wpdicta-ha-staticfiles-media-v1.s3.amazonaws.com/wp-content/uploads/2019/06/01124533/leonardo-dicaprio-meme.jpg" alt="" className='imagen'/><div className='icon-label'><label onClick={e => handleClick(e,'imagen')} className='icon'><FontAwesomeIcon icon={faEdit} /></label></div></div> 
                   <input className='file' type="file" name="imagen" id="upload" />
                    <span className='nombre'>{mayus(especialista[0].persona.name) + ' ' + mayus(especialista[0].persona.lastName)}</span>
                    <span className='especialidad'>{especialista[0].specialty}</span>
                </div> 

                <div className='informacion'>
                <div className='info'>
                    <span className='info-title'>Información profesional</span>
                    <div className='data'><span>Dni: </span><span className='data-real'>{especialista[0].persona.dni}</span></div>
                    <div className='data'><span>N° de legajo: </span><span className='data-real'>{especialista[0].enrollment}</span></div>
                    <div className='data'><span>Fecha de nacimiento: </span><span className='data-real'>{especialista[0].persona.birth}</span></div>
                </div>
                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información personal</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'datos')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>
                    <div className='data'><span>Telefono: </span>{editar.datos === true ? <input type='text' value={datosEsp.phone} onChange={e => handleChange(e)} name='phone'/> : <span className='data-real'>{especialista[0].persona.phone}</span>}</div>
                    <div className='data'><span>Email: </span>{editar.datos === true ? <input type='text' value={datosEsp.email} onChange={e => handleChange(e)} name='email'/> : <span className='data-real'>{especialista[0].persona.email}</span>}</div>
                    <div className='data'><span>Dirección: </span>{editar.datos === true ? <input type='text' value={datosEsp.adress} onChange={e => handleChange(e)} name='adress' /> : <span className='data-real'>{especialista[0].persona.adress}</span>}</div>
                </div>

                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información de cuenta</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'cuenta')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>
                <div className='data'><span>usuario: </span>{editar.cuenta === true ? <input type='text' value={datosEsp.user} onChange={e => handleChange(e)} name='user'/> : <span className='data-real'>{especialista[0].persona.user}</span>}</div>
                <div className='data'><span>Contraseña actual: </span>{editar.cuenta === true ? <input type='password' onChange={e => handleChange(e)} name='passwordActual'/> : <span className='data-real'>{hardCodeo(especialista[0].persona.password.length)}</span>}</div>
                {validaciones && <label className='error'>La contraseña actual no coincide con la ingresada</label>  }
                {editar.cuenta === true && <div className='data'><span>Nueva contraseña: </span>  <input type='password' onChange={e => handleChange(e)} name='password'/> </div>}
              
               </div>
                
                </div>

                

                 {(editar.imagen === true) || (editar.datos === true) || (editar.cuenta === true) ? <button onClick={e => handleSubmit(e)} name='saveImage' className='button-change'>Guardar cambios</button> : null} 
                   
            </div>

        </div>
    )

}