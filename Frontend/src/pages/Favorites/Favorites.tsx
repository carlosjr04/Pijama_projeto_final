import FavItem from '../../componentes/FavItem/FavItem';
import SectionHeader from '../../componentes/SectionHeader/SectionHeader'
import useFavStore from '../../stores/FavStore'

export default function Favorites() {
    const favorites = useFavStore((state) => state.favorites);

    return(
        <>
            <SectionHeader currentPage="favorites"/>
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
        </>
    )
}