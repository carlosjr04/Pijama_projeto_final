import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice'
import styles from './styles.module.css'
import { size } from '../../types/types';
/* import useCartStore from '../../stores/CartStore'; */

interface cartItemProps {
    name: string;
    imgPath: string;
    code: number;
    size: size;
    price: number;
}

export default function CartItem(pijama : cartItemProps){
    /* const removeFromCart = useCartStore((state) => state.removeFromCart); */
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
            <img src={pijama.imgPath} alt=''></img>

            <div className={styles.itemInfo}>
                <div className={styles.nameAndCodeGroup}>
                    <h4>{pijama.name}</h4>
                    <h6>#{pijama.code}</h6>
                </div>
                <p></p>
            </div>
            
            <div className={styles.quantityGroup}>
                <p>Quantidade:</p>
                <div className={styles.inputGroup}>
                    <button onClick={handleDecrement} className={styles.button}>-</button>
                    <span className={styles.output}>{quantity}</span>
                    <button onClick={handleIncrement} className={styles.button}>+</button>
                </div>
                <h6>Não perca sua oportunidade! Há apenas mais <span>{pijama.size.stock_quantity}</span> peças disponíveis!</h6>
                
            </div>
            <h2>R$ {formatPrice(quantity * pijama.price)}</h2>
            <button /* onClick={removeFromCart} */ className={styles.deleteButton}>X</button>
        </div>
    )
}