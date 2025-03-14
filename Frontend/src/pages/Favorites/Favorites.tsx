import FavItem from '../../componentes/FavItem/FavItem';
import SectionHeader from '../../componentes/SectionHeader/SectionHeader'
import useFavStore from '../../stores/FavStore'
import styles from './styles.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { pijama } from '../../types/types';


export default function Favorites() {
    const favorites = useFavStore((state) => state.favorites);
    const [pijamas, setPijamas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/pijamas")
      .then(response => {
        const favoritos = response.data.filter((pijama:pijama) => pijama.favorite);
        setPijamas(favoritos);
      })
      .catch(error => console.error("Erro ao buscar pijamas:", error));
  }, []);
    return favorites.length > 0 ? (
        <>
            <SectionHeader currentPage="favorites"/>
            <div className={styles.wrapper}>
                <Swiper
                    navigation
                    slidesPerView={favorites.length < 4 ? favorites.length : 4}
                    className={styles.favContainer}
                >
                    {favorites.map((item) => (
                        <SwiperSlide>
                            <FavItem
                                id={item.id}
                                name={item.name}
                                imgPath={item.imgPath}
                                price={item.price}
                            />
                        </SwiperSlide>
                    ))} 
                </Swiper>
            </div>  
        </>
    ) : (
        <>
            <SectionHeader currentPage="favorites"/>
            <div className={styles.emptyFavMessage}>   
                <h2>Você não tem pijamas favoritos {":("}</h2>
            </div>
        </> 
    );
}