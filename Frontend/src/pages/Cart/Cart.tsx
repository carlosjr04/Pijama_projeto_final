import CartItem from '../../componentes/CartItem/CartItem'
import styles from './styles.module.css'

export default function Cart(){
    const itemsOnCart = [
        {
            id: 1,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "../assets/test-image.jpeg",
            code: "Ref: #123456",
            size: "M",
            price: 78.90,
        },
        {
            id: 2,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "../assets/test-image.jpeg",
            code: "Ref: #123456",
            size: "P",
            price: 78.90,
        },
        {
            id: 3,
            name: "PIJAMA FEMININO LONGO - ESTAMPA POÁ",
            imgPath: "../assets/test-image.jpeg",
            code: "Ref: #123456",
            size: "GG",
            price: 78.90,
        }
    ]
    return(
        <>
            <div className={styles.navigationTabs}>

            </div>

            <div className={styles.cartContainer}>
                <ul className={styles.cartItemsList}>
                    {
                        itemsOnCart.map((item) => (
                            <li key={item.id}>
                                <CartItem 
                                    name={item.name} 
                                    imgPath={item.imgPath} 
                                    code={item.code} 
                                    size={item.size} 
                                    price={item.price}
                                />
                            </li>
                        ))
                    }
                </ul>
                <span>Total R$ </span>
                <button>COMPRE TUDO</button>
            </div>
        </>
    )
}