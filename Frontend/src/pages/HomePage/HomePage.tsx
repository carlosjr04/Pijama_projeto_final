import style from "./style.module.css";
import apresentacao from "../../assets/Apresentação.png";
import banner1 from "../../assets/BannerNatal.png";
import banner2 from "../../assets/BannerValetin.png";
import banner3 from "../../assets/BannerGrupo.png";
import roupa from "../../assets/Women's Pajama.png";
import voltar from "../../assets/anterior.png";
import avancar from "../../assets/avancar.png";
import delivery from "../../assets/Delivery.png";
import people from "../../assets/People.png";
import { register } from "swiper/element/bundle";
import "swiper/css";
import { roupas_teste } from "../Pijamas/Pijamas";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import Roupa from "../Pijamas/componentes/roupa/roupa";
import { feedback, pijama } from "../../types/types";
import Feedback from "./componentes/Feedback";
import { useNavigate } from "react-router-dom";

register();
const Banners = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },
];

const feedbackList: feedback[] = [
  {
    id: 1,
    name: "Ana",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Carlos",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam..",
    rating: 4,
  },
  {
    id: 3,
    name: "Mariana",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.!",
    rating: 5,
  },
  {
    id: 4,
    name: "Pedro",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam..",
    rating: 5,
  },
  {
    id: 5,
    name: "Juliana",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam..",
    rating: 3,
  },
  {
    id: 6,
    name: "Ricardo",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 3,
  },
  {
    id: 7,
    name: "Fernanda",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 5,
  },
  {
    id: 8,
    name: "João",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 4,
  },
  {
    id: 9,
    name: "Camila",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 3,
  },
  {
    id: 10,
    name: "Lucas",
    description:
      "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam.",
    rating: 5,
  },
];

export default function HomePage() {
  const navigate = useNavigate()
  const swiperRef1 = useRef<SwiperCore | null>(null);
  const swiperRef2 = useRef<SwiperCore | null>(null);

  function pijamaPromocao() {
    let lista_pijama = roupas_teste.filter((pijama) => pijama.on_sale === true);
    let lista_random: pijama[] = [];
    while (lista_random.length < 3 && lista_pijama.length > 0) {
      let num = Math.floor(Math.random() * lista_pijama.length);
      let repetido = lista_random.find(
        (pijama) => pijama.id === lista_pijama[num].id
      );
      if (!repetido) {
        lista_random.push(lista_pijama[num]);
      }
    }
    return lista_random;
  }
  function feedbacksAvaliados(){
    let listaFeddback = feedbackList.filter((feedback)=> feedback.rating>=4)
    return listaFeddback
  }

  function navigateFeedback(){
    navigate("/feedback")
  }
  return (
    <>
      <img className={style.apresentacao} src={apresentacao} alt="" />

      <div className={style.botoes}>
        <button
          className={style.voltar}
          onClick={() => {
            console.log("Voltando...");
            swiperRef1.current?.slidePrev();
          }}
        >
          
        </button>
        <button
          className={style.avancar}
          onClick={() => {
            console.log("Avançando...");
            swiperRef1.current?.slideNext();
          }}
        >
          
        </button>
      </div>

      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef1.current = swiper;
        }}
        navigation={false}
      >
        {Banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img src={banner.image} alt="Slider" className={style.banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={style.valores}>
        <div>
          <img src={roupa} alt="" />
          <p>Pijamas confortáveis e com tecnologia</p>
        </div>
        <div>
          <img src={people} alt="" />
          <p>Modelos para todas as idades e tamanhos</p>
        </div>
        <div>
          <img src={delivery} alt="" />
          <p>Frete grátis em todo o Brasil e exterior</p>
        </div>
      </div>

      <div className={style.promocoes}>
        <h1>Nossas últimas promoções!</h1>
        <div className={style.promocoesPijama}>
          {pijamaPromocao().map((pijama) => (
            <Roupa
              key={pijama.id}
              id={pijama.id}
              favorite={pijama.favorite}
              image={pijama.image}
              name={pijama.name}
              on_sale={pijama.on_sale}
              sale_percent={pijama.sale_percent}
              price={pijama.price}
              estacao={pijama.season}
              gender={pijama.gender}
              type={pijama.type}
            />
          ))}
        </div>

        <div className={style.feedback}>
          <h1>Feedbacks</h1>
          <div className={style.feedbackElementos}>
            <img
              src={voltar}
              className={style.voltarfeedback}
              onClick={() => swiperRef2.current?.slidePrev()}
            ></img>
            <Swiper
              slidesPerView={3}
              onSwiper={(swiper) => (swiperRef2.current = swiper)}
            >
              {feedbacksAvaliados().map((feedback) => (
                <SwiperSlide key={feedback.id}>
                  <Feedback
                    id={feedback.id}
                    name={feedback.name}
                    description={feedback.description}
                    rating={feedback.rating}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <img
              src={avancar}
              className={style.avancarfeedback}
              onClick={() => swiperRef2.current?.slideNext()}
            ></img>
          </div>
        </div>
        
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button onClick={()=>navigateFeedback()} className={style.botaoFeed}>Também quero dar um feedback!</button>
      </div>
      
    </>
  );
}
