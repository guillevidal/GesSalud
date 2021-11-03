import { useModal } from '../../../Modal/useModal.js';
import Modal from '../../../Modal/Modal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function Diagnosticos({ fecha, diagnostico, tratamiento, derivacion }) {

    const [isOpenChangeTurno, openChangeTurno, closeChangeTurno] = useModal(false)

    return (
        <>
            <tr className='cardDiag'>
                <td className='data fecha'>{fecha}</td>
                <td className='data diag'>{diagnostico}</td>
                <td className='data boton'><FontAwesomeIcon onClick={openChangeTurno} icon={faEye} className='icon' /></td>
            </tr>

            <Modal isOpen={isOpenChangeTurno} closeModal={closeChangeTurno}>
                <div className='cardDiagDetail'>
                    <div className='datitos'>
                        <span className='titulo'>Fecha</span>
                        <span className='dataaa'>{fecha}</span>
                    </div>
                    <div className='datitos'>
                        <span  className='titulo'>Diagnóstico</span>
                        <span className='dataaa'>{diagnostico}</span>
                    </div>
                    <div className='datitos'>
                        <span  className='titulo'>Tratamiento</span>
                        <span className='dataaa'>{tratamiento}</span>
                    </div>
                    <div className='datitos'>
                        <span  className='titulo'>Derivación</span>
                        <span  className='dataaa'>{derivacion}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}