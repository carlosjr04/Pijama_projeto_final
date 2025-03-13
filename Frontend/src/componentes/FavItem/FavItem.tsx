import heart from '../../assets/favorito_cheio.png'
import styles from './styles.module.css'
import { favItemProps } from '../../types/types'
import { formatPrice } from '../../utils/formatPrice';
import useFavStore  from '../../stores/FavStore';

export default function FavItem({id, name, imgPath, price} : favItemProps) {
    const removeFavorite = useFavStore((state) => state.removeFavorite);
    return(
        <div className={styles.card}>
            <div className={styles.header}>
                <button onClick={() => removeFavorite(id)}>
                    <img src={heart} alt="ícone de coração vermelho"/>
                </button>
            </div>

            <img
                src={imgPath}
                alt=""
                className={styles.imagem}
            />

            <div className={styles.texto}>
                <h3>{name}</h3>
                <div className={styles.preco}>
                    <h2>R$ {formatPrice(price)}</h2>
                </div>
            </div>
      </div>
    )
}