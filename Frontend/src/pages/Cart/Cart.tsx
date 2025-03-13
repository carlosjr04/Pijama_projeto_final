import SectionHeader from '../../componentes/SectionHeader/SectionHeader'
import CartItem from '../../componentes/CartItem/CartItem'
import Modal from '../../componentes/Modal/Modal'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
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
    const itemsOnCart = [
        {
            id: 1,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "https://picsum.photos/200/300",
            code: "Ref: #123456",
            size: "M",
            price: 78.90,
        },
        {
            id: 2,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "https://picsum.photos/200/300",
            code: "Ref: #123456",
            size: "P",
            price: 78.90,
        },
        {
            id: 3,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "https://picsum.photos/200/300",
            code: "Ref: #123456",
            size: "GG",
            price: 78.90,
        }
    ]
    function somarPreco(){
        const total = cart.reduce((acc, produto) => acc + (produto.price*produto.quantity), 0);
        return total
    }
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