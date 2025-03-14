import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice'
import styles from './styles.module.css'
import { size } from '../../types/types';
import useCartStore from '../../stores/CartStore';
import useCartPreco from '../../stores/CartPreco';

interface cartItemProps {
    name: string;
    imgPath: string;
    code: number;
    size: size;
    price: number;
    quantity:number;
}

export default function CartItem(pijama : cartItemProps){

    const removeFromCart = useCartStore((state) => state.removeFromCart); 
    const somarPreco = useCartPreco((state) => state.somarPreco);
    const diminuirPreco = useCartPreco((state) => state.diminuirPreco);
    const [quantity, setQuantity] = useState(pijama.quantity);

    function handleIncrement() {
        if (quantity < pijama.quantity){
            
            setQuantity(quantity + 1)
            somarPreco(pijama.price)
        }
    }

    function handleDecrement() {
        if (quantity > 1){
            diminuirPreco(pijama.price)
            setQuantity(quantity - 1)
            
        }
    }
    return(
        <div className={styles.cardContainer}>
            <img src={pijama.imgPath} alt=''></img>

            <div className={styles.itemInfo}>
                <div className={styles.nameAndCodeGroup}>
                    <h1>{pijama.name}</h1>
                    <h6>#{pijama.code}</h6>
                </div>
                <p>{pijama.size.size}</p>
            </div>
            
            <div className={styles.quantityGroup}>
                <p className={styles.quantidadeP}>Quantidade:</p>
                <div className={styles.inputGroup}>
                    <button onClick={handleDecrement} className={styles.button}>-</button>
                    <span className={styles.output}>{quantity}</span>
                    <button onClick={handleIncrement} className={styles.button}>+</button>
                </div>
                <p>Não perca sua oportunidade! Há apenas mais <span>{pijama.size.stock_quantity}</span> peças disponíveis!</p>
                
            </div>
            <h2>R$ {formatPrice(quantity * pijama.price)}</h2>
            <button  onClick={()=>removeFromCart(pijama.code)}  className={styles.deleteButton}>X</button>
        </div>
    )
}