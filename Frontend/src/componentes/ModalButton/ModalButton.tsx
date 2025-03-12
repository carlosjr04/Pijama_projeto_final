import styles from './styles.module.css'

export default function ModalButton(props: {children: React.ReactNode}) {
    return(
        <button className={styles.modalButton}>
            {props.children}
        </button>    
    )
}