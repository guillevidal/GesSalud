/* eslint-disable */
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetearPacienteDetallado } from "../../../../actions/index.js"
import Nav from "../../../Layout/Nav.jsx";
import './patientCardDetails.scss';
import HistoriaClinica from "./historiaClinica.jsx";
import ModalHistoriaClinica from '../../../Modal/ModalHistoriaClinica.js';
import { useModal } from "../../../Modal/useModal.js";
import { useReactToPrint } from 'react-to-print';
import imagen from '../../../specialist/images/user.png'

const PatientCardDetails = () => {
    const dispatch = useDispatch()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const patientDetails = useSelector(state => state.pacienteDetallado);
    const { id, name, lastName, dni, email, phone, adress, birth, paciente, gender, } = patientDetails[0];
    const handleReset = () => {
        dispatch(resetearPacienteDetallado())
    }

    const [isOpenHistoriaClinica, openHistoriaClinica, closeHistoriaClinica] = useModal(false)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        
        content: () => componentRef.current,
        documentTitle: "MiHistoriaClinica",
    });

    return (
        <div id="patientDetails-container">
            <Nav />
            <div className='boton-regresar'>
                <Link to="/patientPys" onClick={handleReset} className='boton'>Volver</Link>
                <span className='boton' onClick={openHistoriaClinica}>Historia Clínica</span>
                <Link to="/patientEdit" className='boton'>Modificar</Link>
            </div>
            <div className='division'>
                <div className='lista-detalles'>

                    <div className='detalles'>
                        <div className='encabezado'>
                        {patientDetails[0] && patientDetails[0].imgProfile ? 
                       <img src={`https://gessalud.herokuapp.com/images/profile/${patientDetails[0].dni}`} alt="" className='imagen'/>
                       :
                       <img src={imagen} alt="" className='imagen'/>
                       
                       }
                            <span className='nombre-apellido'>{capitalFirstLetter(name) + ' ' + capitalFirstLetter(lastName)}</span>
                        </div>
                        <div className='data'>
                            <span className='data-info'>Dni: <b className='data-detail'>{dni}</b></span>
                            <span className='data-info'>Email: <b className='data-detail'> {email}</b></span>
                            <span className='data-info'>Celular: <b className='data-detail'> {phone}</b></span>
                            <span className='data-info'>Direccion: <b className='data-detail'>{adress}</b></span>
                            <span className='data-info'>Birth: <b className='data-detail'>{birth}</b></span>
                            <span className='data-info'>Genero: <b className='data-detail'>{gender}</b></span>
                        </div>
                        <div className='data'>

                            <span className='data-info'>Contacto de emergencia: <b className='data-detail'> {paciente.emergencyContact}</b></span>

                        </div>
                    </div>


                </div>
                <div>
                    <ModalHistoriaClinica isOpen={isOpenHistoriaClinica} closeModal={closeHistoriaClinica}>
                        <div className="rol-4-user" ref={componentRef}>
                            <div className="contenido">
                                <label className="sub-title">HISTORIA CLÍNICA</label>
                                <div className="">
                                    <span className="items-historia-clinica">CÓDIGO: {paciente.historiaClinica.id}</span>
                                    <span className="items-historia-clinica">FECHA: {paciente.historiaClinica.creationDate}</span>

                                </div>
                            </div>
                            <div className="informacion">
                                <span className="label-title-search">INFORMACIÓN DEL PACIENTE</span>
                                <div className="contenido">
                                    <span className="items">NOMBRE : {(name)}</span>
                                    <span className="items">APELLIDO : {(lastName)}</span>
                                    <span className="items">DNI : {dni}</span>
                                    <span className="items">FECHA DE NACIMIENTO : {birth}</span>
                                </div>
                            </div>
                            <div className="informacion">
                                <span className="label-title-search">INFORMACIÓN DE CONTACTO</span>
                                <div className="contenido">
                                    <span className="items">TELÉFONO: {phone}</span>
                                    <span className="items">DIRECCIÓN: {adress}</span>
                                    <span className="items">EMAIL: {email}</span>
                                    <span className="items">CONTACTO DE EMERGENCIA: {paciente.emergencyContact}</span>
                                </div>
                            </div>
                            <div className="informacion">
                                <span className="label-title-search">DIAGNÓSTICOS</span>
                                {
                                    paciente.historiaClinica.diagnosticos.length > 0 ?
                                        paciente.historiaClinica.diagnosticos.map(diagnostico => {
                                            return (
                                                <div className="contenido">
                                                    <span className="items">FECHA: {diagnostico.date}</span>
                                                    <span className="items">DIAGNOSTICO:</span>
                                                    <span className="items">{diagnostico.diagnostic}</span>
                                                    <span className="items">DERIVACION: {diagnostico.derivation}</span>
                                                </div>
                                            )
                                        }) : <span className="items-historia-clinica">EL PACIENTE NO CUENTA CON DIAGNOSTICOS</span>
                                }
                                <div>

                                </div>
                            </div>
                            
                        </div>
                        <button className='button-pdf' onClick={handlePrint}>Generar PDF</button>
                    </ModalHistoriaClinica>
                </div>
               {/* <HistoriaClinica
                    medication={paciente.medication}
                    disease={paciente.disease}
                    historiaClinica={paciente.historiaClinica}
                />*/}
            </div>

        </div>

    )
}

export default PatientCardDetails