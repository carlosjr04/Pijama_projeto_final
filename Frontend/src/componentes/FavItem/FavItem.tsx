import heart from '../../assets/favorito_cheio.png'
import styles from './styles.module.css'
import { favItemProps } from '../../types/types'
import { formatPrice } from '../../utils/formatPrice';

export default function FavItem({name, imgPath, price} : favItemProps) {
    return(
        <div className={styles.cardContainer}>
            <img className={styles.cardIcon} src={heart} alt="ícone de coração vermelho"/>
            <img className={styles.cardImage} src={imgPath} alt="foto do pijama"/>
            <h3>{name}</h3>
            <h4>R$ {formatPrice(price)}</h4>
        </div>
    )
}