import roupaImagem from "../../assets/roupa_teste.png";
import favorito_cheio from "../../assets/favorito_cheio.png";
import favorito_vazio from "../../assets/favorito_vazio.png";
import desconto_imagem from "../../assets/desconto_imagem.png";
import style from "./style.module.css";
import { pijama } from "../../types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Roupa(roupa: pijama) {
  const [favorito, setFavorito] = useState(roupa.favorite);
  const navigate = useNavigate();

  function parcelamento(preco: number): number {
    const precoParcelado = preco / 6;
    return Number(precoParcelado);
  }
  function colandoVirgula(preco: number) {
    const numero = preco.toFixed(2);
    const precoString = numero.toString();
    const partes = precoString.split(".");
    const partesLista = [];
    partesLista.push(Number(partes[0]));
    partesLista.push(partes[1]);
    return partesLista;
  }
  function navigatePijama(){
    navigate(`/pijama/${roupa.id}`)
  }
  return (
    <>
      <div onClick={()=>navigatePijama()} className={style.card}>
        <div className={style.header}>
          <button
            onClick={() => setFavorito((prev) => !prev)}
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

        <img src={roupaImagem} alt="" className={style.imagem} />
        <div className={style.texto}>
          <h3>{roupa.name}</h3>
          <div className={style.preco}>
            {roupa.on_sale ? (
              <p className={style.desconto_preco}>
                R%{roupa.sale_percent.toFixed(2)}
              </p>
            ) : (
              <p className={style.desconto_preco}></p>
            )}
            {/* se tentar botar numero com virgula da ruim entao tem uma funçao que faz isso para ficar mais bonito  */}
            <h2>
              R$ {colandoVirgula(roupa.price)[0]},
              {colandoVirgula(roupa.price)[1]}
            </h2>
            <p>
              6x de R${colandoVirgula(parcelamento(roupa.price))[0]},
              {colandoVirgula(parcelamento(roupa.price))[1]}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
