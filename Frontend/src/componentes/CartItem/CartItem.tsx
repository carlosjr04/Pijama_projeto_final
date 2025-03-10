import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice'
import styles from './styles.module.css'

interface cartItemProps {
    name: string;
    imgPath: string;
    code: string;
    size: string;
    price: number;
}

export default function CartItem({name, imgPath, code, size, price} : cartItemProps){
    const [quantity, setQuantity] = useState(1);
    const inStock = 12;

    function handleIncrement() {
        if (quantity < inStock){
            setQuantity(quantity + 1)
        }
    }

    function handleDecrement() {
        if (quantity > 1){
            setQuantity(quantity - 1)
        }
    }
    
    return(
        <div className={styles.cardContainer}>
            <img src={imgPath} alt=''></img>

            <div className={styles.itemInfo}>
                <div className={styles.nameAndCodeGroup}>
                    <h4>{name}</h4>
                    <h6>{code}</h6>
                </div>
                <p>{size}</p>
            </div>
            
            <div className={styles.quantityGroup}>
                <p>Quantidade:</p>
                <div className={styles.inputGroup}>
                    <button onClick={handleDecrement} className={styles.button}>-</button>
                    <span className={styles.output}>{quantity}</span>
                    <button onClick={handleIncrement} className={styles.button}>+</button>
                </div>
                <h6>Não perca sua oportunidade! Há apenas mais <span>{inStock}</span> peças disponíveis!</h6>
                
            </div>
            <h2>R$ {formatPrice(quantity * price)}</h2>
            <div>
                {/* Botão de excluir do carrinho */}
            </div>
        </div>
    )
}