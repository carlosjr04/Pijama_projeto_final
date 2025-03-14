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
                  favorite:roupa.favorite,
                  price: roupa.price,
                };
                axios
                  .patch(`http://localhost:3000/pijamas/${roupa.id}`,{ favorite: !favorito })
                  .then(() =>
                    console.log("Pijama favoritado!")
                  )
                  .catch((error) => console.log("algo deu errado" + error));
                setFavorito(!favorito)
                addFavorite(cartItem);
              } else {
                axios
                  .patch(`http://localhost:3000/pijamas/${roupa.id}`,{ favorite: !favorito })
                  .then(() =>
                    console.log("Pijama desfavoritado!")
                  )
                  .catch((error) => console.log("algo deu errado" + error));
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
          src={"https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp"}
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
