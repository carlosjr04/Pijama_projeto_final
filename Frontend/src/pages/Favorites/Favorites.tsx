import FavItem from '../../componentes/FavItem/FavItem';
import SectionHeader from '../../componentes/SectionHeader/SectionHeader'
import useFavStore from '../../stores/FavStore'
import styles from './styles.module.css'

import leftArrow from '../../assets/anterior.png'
import rightArrow from '../../assets/avancar.png'

export default function Favorites() {
    const favorites = useFavStore((state) => state.favorites);

    return favorites.length > 0 ? (
        <>
            <SectionHeader currentPage="favorites"/>
            <div className={styles.favContainer}>
                <button>
                        <img src={leftArrow} alt='seta para esquerda'/>
                </button>
                <ul>
                    {favorites.map((item) => (
                        <li key={item.id}>
                            <FavItem
                                id={item.id}
                                name={item.name}
                                imgPath={item.imgPath}
                                price={item.price}
                            />
                        </li>
                    ))}
                </ul>
                <button>
                    <img src={rightArrow} alt='seta para esquerda'/>
                </button>
            </div> 
        </>
    ) : (
        <div className={styles.emptyFavMessage}>   
            <h2>Você não tem pijamas favoritos {":("}</h2>
        </div>
    );
}