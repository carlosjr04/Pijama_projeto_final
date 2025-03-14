import FavItem from "../../componentes/FavItem/FavItem";
import SectionHeader from "../../componentes/SectionHeader/SectionHeader";
import useFavStore from "../../stores/FavStore";
import styles from "./styles.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pijama } from "../../types/types";
import voltar from "../../assets/anterior.png";
import avancar from "../../assets/avancar.png";

export default function Favorites() {
  const swiperRef1 = useRef<SwiperCore | null>(null);
  const swiperRef2 = useRef<SwiperCore | null>(null);
  const favorites = useFavStore((state) => state.favorites);
  const [favorite, setFavorites] = useState<pijama[]>([]);
  const [pijamasFavoritos, setPijamasFavoritos] = useState<pijama[]>([]);
  useEffect(() => {
    const fetchPijamas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/pijamas/getAll"
        );
        const favoritos = response.data.filter(
          (pijama: pijama) => pijama.favorite
        );
        setFavorites(favoritos);
      } catch (error) {
        console.error("Erro ao buscar pijamas:", error);
      }
    };

    fetchPijamas();
  }, []);
  useEffect(() => {
    setPijamasFavoritos(favorite);
  });
  return favorites.length > 0 ? (
    <>
      <SectionHeader currentPage="favorites" />
      <div className={styles.wrapper}>
        <img
          src={voltar}
          className={styles.voltarfeedback}
          onClick={() => swiperRef2.current?.slidePrev()}
        ></img>
        <Swiper
          onSwiper={(swiper) => (swiperRef2.current = swiper)}
          slidesPerView={pijamasFavoritos.length < 4 ? pijamasFavoritos.length : 4}
          className={styles.favContainer}
        >
          {pijamasFavoritos.map((item) => (
            <SwiperSlide key={item.id}>
              <FavItem
                id={item.id}
                name={item.name}
                imgPath={item.image}
                price={item.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src={avancar}
          className={styles.avancarfeedback}
          onClick={() => swiperRef2.current?.slideNext()}
        ></img>
      </div>
    </>
  ) : (
    <>
      <SectionHeader currentPage="favorites" />
      <div className={styles.emptyFavMessage}>
        <h2>Você não tem pijamas favoritos {":("}</h2>
      </div>
    </>
  );
}
