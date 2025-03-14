import { useNavigate, useParams } from "react-router-dom";
import { cartItemProps, pijama, pijamaEstranho } from "../../types/types";
import { useEffect, useState } from "react";
import favoritoCheio from "../../assets/favorito_cheio.png";
import favoritoVazio from "../../assets/favorito_vazio.png";

import verao from "../../assets/Verao.png";
import inverno from "../../assets/Inverno.png";

import feminino from "../../assets/Feminino.png";
import unisex from "../../assets/Unisex.png";
import familia from "../../assets/Familia.png";
import todos from "../../assets/Todos.png";
import masculino from "../../assets/Masculino.png";

import adulto from "../../assets/Adulto.png";
import infantil from "../../assets/Infantil.png";

import image from "../../assets/roupa_teste.png";
import style from "./style.module.css";
import useCartStore from "../../stores/CartStore";
import axios from "axios";

const listaTamanhos = ["PP", "P", "M", "G", "GG"];

export default function Pijama() {
  useEffect(() => {
    axios
      .get(`http://localhost:3000/pijamas/${pijamaId}`)
      .then((response) =>{ setpijamaPagina(response.data);})
      .catch((error) => console.log("algo deu errado" + error));

    setFavorito(pijamaPagina?.pijama.favorite);
    gerarAtributos();
  }, []);

  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantidade, setQuantidade] = useState(1);

  const [tamanhoAtual, setTamanhoAtual] = useState<string>("P");
  const { pijamaId } = useParams();
  const [pijamaPagina, setpijamaPagina] = useState<pijamaEstranho>();
  const [favorito, setFavorito] = useState<boolean>();

  function calcularDesconto() {
    if (pijamaPagina) {
      let desconto = pijamaPagina.pijama.price - pijamaPagina.pijama.price / 10;
      return desconto;
    }
    return 0;
  }
  function calcularParcela() {
    if (pijamaPagina) {
      let parcela = pijamaPagina.pijama.price / 6;
      return parcela;
    }
    return 0;
  }
  function quantidadeTamanho() {
    if(pijamaPagina?.size){
      let num =
      pijamaPagina?.size.find((s) => s.size === tamanhoAtual)?.stock_quantity ||
      0;
    return num;
    }else{
      return 0
    }
    
  }
  function gerarAtributos(): string[] {
    if (!pijamaPagina) return [];

    const map: Record<string, Record<string, string>> = {
      season: {
        Verão: verao,
        Inverno: inverno,
        Todos: todos,
      },
      gender: {
        Masculino: masculino,
        Feminino: feminino,
        Unisex: unisex,
        Família: familia,
        Todos: todos,
      },
      type: {
        Adulto: adulto,
        Infantil: infantil,
        Todos: todos,
      },
    };

    const listaElementos: string[] = [
      map.season[pijamaPagina.pijama.season] || "",
      map.gender[pijamaPagina.pijama.gender] || "",
      map.type[pijamaPagina.pijama.type] || "",
    ].filter(Boolean);

    return listaElementos;
  }
  
  function carrinho() {
    
    if (!pijamaPagina) {
      console.error("Erro: pijamaPagina não está definido.");
      return;
    }
  
    if (!tamanhoAtual || !quantidade) {
      console.error("Erro: tamanho ou quantidade inválidos.");
      return;
    }
    
    if (pijamaPagina) {
      let cartItem: cartItemProps = {
        name: pijamaPagina?.pijama.name,
        imgPath: pijamaPagina?.pijama.image,
        code: pijamaPagina.pijama.id,
        size: { size: tamanhoAtual, stock_quantity: 5 },
        quantity: quantidade,
        price: pijamaPagina.pijama.price,
      };
      addToCart(cartItem);
    }

    navigate("/homepage");
  }
  function formatarNumero(numero: number | undefined): string {
    if (numero) {
      return numero.toFixed(2).toString().replace(".", ",");
    } else {
      return "0";
    }
  }
  return (
    <>
      <div className={style.card}>
        <img src={image} className={style.imagem} alt="Foto de pijama" />
        <div className={style.cardInterno}>
          <div className={style.header}>
            <h1>{pijamaPagina?.pijama.name}</h1>
            <p>#REF:{pijamaPagina?.pijama.id}</p>
          </div>
          <div className={style.precos}>
            <div className={style.precosMaior}>
              <h1>R$ {formatarNumero(pijamaPagina?.pijama.price)}</h1>
              <h3>
                Ou por <span>R${formatarNumero(calcularDesconto())}</span> no
                PIX
              </h3>
            </div>
            <h3>
              6x de <span>R${formatarNumero(calcularParcela())}</span>
            </h3>
          </div>
          <p className={style.tamanho}>Tamanhos:</p>
          <div className={style.tamanhoLista}>
            <div>
              {listaTamanhos.map((tamanho) =>
                tamanho === tamanhoAtual ? (
                  <button
                    className={style.botaoTamanhoEscolhido}
                    onClick={() => {
                      setTamanhoAtual(tamanho);
                      setQuantidade(1);
                    }}
                  >
                    {tamanho}
                  </button>
                ) : (
                  <button
                    className={style.botaoTamanho}
                    onClick={() => {
                      setTamanhoAtual(tamanho);
                      setQuantidade(1);
                    }}
                  >
                    {tamanho}
                  </button>
                )
              )}
            </div>
            <p>
              Ainda temos <span>{quantidadeTamanho()}</span> peças do tamanho
              escolhido em nosso estoque!
            </p>
          </div>
          <p className={style.quantidade}>Quantidade:</p>
          <div className={style.botaoQuant}>
            <button
              className={style.botaoMenos}
              onClick={() => {
                if (quantidade > 1) {
                  setQuantidade(quantidade - 1);
                }
              }}
            ></button>
            <p>{quantidade}</p>
            <button
              className={style.botaoMais}
              onClick={() => {
                if (quantidade < quantidadeTamanho()) {
                  setQuantidade(quantidade + 1);
                }
              }}
            ></button>
          </div>
          <div className={style.botoesFinal}>
            <button onClick={() => carrinho()} className={style.carrinho}>
              ADICIONAR AO CARRINHO
            </button>
            <button
              onClick={() => {
                if (pijamaPagina) {
                  setFavorito(!favorito);
                }
              }}
              className={style.coracao}
            >
              {favorito ? (
                <img src={favoritoCheio} alt="Favorito" />
              ) : (
                <img src={favoritoVazio} alt="Não Favorito" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={style.elementos}>
        {gerarAtributos().map((elemento, index) => (
          <div key={index}>
            <img
              className={style.tipo}
              src={elemento}
              alt={`Ícone ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
