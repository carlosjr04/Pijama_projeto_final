import styles from './styles.module.css'

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

export default function Modal({isOpen, handleClose} : ModalProps) {
    if (!isOpen) return null;
    return(
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Dados</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type='text'
                        placeholder='Nome completo'
                    />
                    <input
                        type='text'
                        placeholder='CPF'
                    />
                    <input
                        type='text'
                        placeholder='CEP'
                    />
                    <input
                        type='text'
                        placeholder='Logradouro'
                    />
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.smallInput}
                            type='text'
                            placeholder='UF'
                        />
                        <input
                            type='text'
                            placeholder='Cidade'
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.smallInput}
                            type='text'
                            placeholder='Número'
                        />
                        <input
                            type='text'
                            placeholder='Bairro'
                        />
                    </div>
                    <button id={styles.submitButton}>ENVIAR</button>
                </form>
            </div>
        </div>
    )
}