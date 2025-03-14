import heart from '../../assets/favorito_cheio.png'
import heartEmpty from "../../assets/favorito_vazio.png"
import styles from './styles.module.css'
import { favItemProps } from '../../types/types'
import { formatPrice } from '../../utils/formatPrice';
import useFavStore  from '../../stores/FavStore';
import axios from 'axios';
import { useState } from 'react';

export default function FavItem({id, name, imgPath, price,favorite} : favItemProps) {
    const removeFavorite = useFavStore((state) => state.removeFavorite);
    const [favoriteItem,setFavoriteItem] = useState<boolean>(favorite)
    return(
        <div className={styles.card}>
            <div className={styles.header}>
                <button onClick={() => {removeFavorite(id); 
                    axios
                    .patch(`http://localhost:3000/pijamas/${id}`,{ favorite: !favorite })
                    .then((response) =>{
                      console.log("Pijama desfavoritado!")
                      setFavoriteItem(!favorite)
                })
                    .catch((error) => console.log("algo deu errado" + error));
                }}>
                    {favoriteItem?<img src={heart} alt="ícone de coração vermelho"/>:<img src={heartEmpty} alt="ícone de coração vermelho"/>}
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