import SectionHeader from '../../componentes/SectionHeader/SectionHeader'
import CartItem from '../../componentes/CartItem/CartItem'
import Modal from '../../componentes/Modal/Modal'
import styles from './styles.module.css'
import {  useState } from 'react';
import useCartStore from '../../stores/CartStore';

export default function Cart(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = useCartStore((state)=>state.cart)
    const precoTotal = useCartStore((state)=>state.precoTotal)
    
    const openModal = () => {
        setIsModalOpen(true);
        window.scrollTo(0, 0);
    }
    const closeModal = () => setIsModalOpen(false);
    
    return(
        <>
            <SectionHeader currentPage="cart"/>
            <div className={styles.cartContainer}>
                <ul className={styles.cartItemsList}>
                    {
                        cart.map((item) => (
                            <li key={item.code}>
                                <CartItem 
                                    name={item.name} 
                                    imgPath={item.imgPath} 
                                    code={item.code} 
                                    size={item.size} 
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            </li>
                        ))
                    }
                </ul>
                <div id={styles.totalPrice}>
                    <span>Total</span>
                    <span>R${precoTotal.toFixed(2)}</span> 
                </div>
                <button onClick={openModal} id={styles.bigBlueButton}>COMPRE TUDO</button>
                <Modal isOpen={isModalOpen} handleClose={closeModal}/>
            </div>
        </>
    )
}