import styles from './styles.module.css'

interface cartItemProps {
    name: string;
    imgPath: string;
    code: string;
    size: string;
    price: number;
}

export default function CartItem({name, imgPath, code, size} : cartItemProps){
    return(
        <div className={styles.cardContainer}>
            <img src={imgPath} alt=''></img>
            <div className={styles.itemInfoGroup}>
                <h4>{name}</h4>
                <p>{code}</p>
                <p>{size}</p>

            </div>
            <div className={styles.quantityAndTotalPriceGroup}>
                <p>Quantidade:</p>
                {/* Botão de aumentar/diminuir quantidade */}
                <p>Não perca sua oportunidade! Há apenas mais <span>X</span> peças disponíveis!</p>
                <h2>R$ total</h2>
            </div>
            <div>
                {/* Botão de excluir do carrinho */}
            </div>
        </div>
    )
}