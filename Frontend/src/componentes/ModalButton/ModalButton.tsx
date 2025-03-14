import { MouseEventHandler } from 'react'
import styles from './styles.module.css'

export default function ModalButton(props: {children: React.ReactNode, onClick: MouseEventHandler<HTMLButtonElement>}) {
    return(
        <button onClick={props.onClick} className={styles.modalButton}>
            {props.children}
        </button>    
    )
}