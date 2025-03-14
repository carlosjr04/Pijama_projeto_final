import roupaImagem from "../../assets/roupa_teste.png";
import favorito_cheio from "../../assets/favorito_cheio.png";
import favorito_vazio from "../../assets/favorito_vazio.png";
import desconto_imagem from "../../assets/desconto_imagem.png";
import style from "./style.module.css";
import { favItemProps, pijama } from "../../types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFavStore from "../../stores/FavStore";
import axios from "axios";

export default function Roupa(roupa: pijama) {
  const [favorito, setFavorito] = useState(roupa.favorite);
  const addFavorite = useFavStore((state) => state.addFavorite);
  const removeFavorite = useFavStore((state) => state.removeFavorite);
  const navigate = useNavigate();

  function parcelamento(preco: number): number {
    const precoParcelado = preco / 6;
    return Number(precoParcelado);
  }
  function colandoVirgula(numero: number | undefined): string {
    if (numero) {
      return numero.toFixed(2).toString().replace(".", ",");
    } else {
      return "0";
    }
  }
  function navigatePijama() {
    navigate(`/pijama/${roupa.id}`);
  }
  // function favoritar(){
  //   axios.patch(`http://localhost:3000/pijama/${roupa.id}`,{favorite:!roupa.favorite})
  // }
  return (
    <>
      <div className={style.card}>
        <div className={style.header}>
          <button
            onClick={() => {
              setFavorito((prev) => !prev);
              if (!roupa.favorite) {
                const cartItem: favItemProps = {
                  name: roupa.name,
                  imgPath: roupa.image,

                  id: roupa.id,

                  price: roupa.price,
                };
                axios
                  .patch(`http://localhost:3000/pijamas/${roupa.id}`,{ favorite: !favorito })
                  .then((response) =>
                    console.log("Pijama favoritado!")
                  )
                  .catch((error) => console.log("algo deu errado" + error));

                addFavorite(cartItem);
              } else {
                removeFavorite(roupa.id);
              }
            }}
            className={style.botao}
          >
            {favorito ? (
              <img src={favorito_cheio} alt="Favorito" />
            ) : (
              <img src={favorito_vazio} alt="Não Favorito" />
            )}
          </button>
          {roupa.on_sale ? (
            <img src={desconto_imagem} alt="" className={style.desconto} />
          ) : null}
        </div>

        <img
          onClick={() => navigatePijama()}
          src={roupaImagem}
          alt=""
          className={style.imagem}
        />
        <div className={style.texto}>
          <h3>{roupa.name}</h3>
          <div className={style.preco}>
            {roupa.on_sale ? (
              <p className={style.desconto_preco}>
                R${colandoVirgula(roupa.sale_percent)}
              </p>
            ) : (
              <p className={style.desconto_preco}></p>
            )}
            {/* se tentar botar numero com virgula da ruim entao tem uma funçao que faz isso para ficar mais bonito  */}
            <h2>R$ {colandoVirgula(roupa.price)}</h2>
            <p>6x de R${colandoVirgula(parcelamento(roupa.price))}</p>
          </div>
        </div>
      </div>
    </>
  );
}
