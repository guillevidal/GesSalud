import './Modal.scss';

const ModalHistoriaClinica = ({ children, isOpen, closeModal }) => {
    const handleModalDataClick = (event) => event.stopPropagation();

    return (

        <div className={`modal-container ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-data-historia-clinica" onClick={handleModalDataClick}>
                <button className="modal-close" onClick={closeModal}><span>x</span></button>
                {children}
            </div>
        </div>
    )
    
}

export default ModalHistoriaClinica;