import style from "./style.module.css";
import vector from "../../assets/Vector.png";
import Roupa from "./componentes/roupa/roupa";
import anterior from "../../assets/anterior.png";
import posterior from "../../assets/prox.png";

import { useState } from "react";
import { roupa_lista } from "../../types/types";

const roupas_teste = [
  {
    id: 1,
    name: "Pijama feminino longo - estampa poá",
    image: "../../../../assets/favorito_vazio.png",
    price: 78.8,
    favorite: true,
    on_sale: true,
    sale_percent: 15.0,
  },
  {
    id: 2,
    name: "Blusa de inverno feminina - gola alta",
    image: "../../../../assets/favorito_vazio.png",
    price: 98.5,
    favorite: false,
    on_sale: true,
    sale_percent: 25.5,
  },
  {
    id: 3,
    name: "Calça jeans feminina - corte reto",
    image: "../../../../assets/favorito_vazio.png",
    price: 120.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 4,
    name: "Vestido de verão feminino - estampa floral",
    image: "../../../../assets/favorito_vazio.png",
    price: 85.3,
    favorite: false,
    on_sale: true,
    sale_percent: 15.2,
  },
  {
    id: 5,
    name: "Jaqueta de couro feminina - preta",
    image: "../../../../assets/favorito_vazio.png",
    price: 250.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 6,
    name: "Tênis esportivo feminino - modelo clássico",
    image: "../../../../assets/favorito_vazio.png",
    price: 160.7,
    favorite: true,
    on_sale: true,
    sale_percent: 20.3,
  },
  {
    id: 7,
    name: "Saia midi feminina - jeans",
    image: "../../../../assets/favorito_vazio.png",
    price: 95.4,
    favorite: false,
    on_sale: true,
    sale_percent: 10.0,
  },
  {
    id: 8,
    name: "Blusa de algodão feminina - manga curta",
    image: "../../../../assets/favorito_vazio.png",
    price: 45.0,
    favorite: true,
    on_sale: true,
    sale_percent: 30.0,
  },
  {
    id: 9,
    name: "Short feminino - cintura alta",
    image: "../../../../assets/favorito_vazio.png",
    price: 55.9,
    favorite: false,
    on_sale: true,
    sale_percent: 18.2,
  },
  {
    id: 10,
    name: "Casaco feminino - lã sintética",
    image: "../../../../assets/favorito_vazio.png",
    price: 180.3,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 11,
    name: "Camiseta feminina - estampa divertida",
    image: "../../../../assets/favorito_vazio.png",
    price: 35.0,
    favorite: false,
    on_sale: true,
    sale_percent: 5.0,
  },
  {
    id: 12,
    name: "Macacão feminino - estilo casual",
    image: "../../../../assets/favorito_vazio.png",
    price: 120.0,
    favorite: true,
    on_sale: true,
    sale_percent: 12.5,
  },
  {
    id: 13,
    name: "Sapatilha feminina - couro sintético",
    image: "../../../../assets/favorito_vazio.png",
    price: 89.9,
    favorite: false,
    on_sale: true,
    sale_percent: 8.5,
  },
  {
    id: 14,
    name: "Bolsa feminina - modelo tote",
    image: "../../../../assets/favorito_vazio.png",
    price: 150.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 15,
    name: "Blusa de lã feminina - tricô",
    image: "../../../../assets/favorito_vazio.png",
    price: 70.2,
    favorite: false,
    on_sale: true,
    sale_percent: 22.4,
  },
  {
    id: 16,
    name: "Moletom feminino - capuz e bolso canguru",
    image: "../../../../assets/favorito_vazio.png",
    price: 110.0,
    favorite: true,
    on_sale: true,
    sale_percent: 18.0,
  },
  {
    id: 17,
    name: "Blazer feminino - alfaiataria",
    image: "../../../../assets/favorito_vazio.png",
    price: 210.5,
    favorite: false,
    on_sale: true,
    sale_percent: 12.0,
  },
  {
    id: 18,
    name: "Legging fitness feminina - compressão",
    image: "../../../../assets/favorito_vazio.png",
    price: 75.3,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 19,
    name: "Regata feminina - tecido leve",
    image: "../../../../assets/favorito_vazio.png",
    price: 39.9,
    favorite: false,
    on_sale: true,
    sale_percent: 20.0,
  },
  {
    id: 20,
    name: "Cardigan feminino - longo",
    image: "../../../../assets/favorito_vazio.png",
    price: 140.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 21,
    name: "Conjunto de pijama feminino - cetim",
    image: "../../../../assets/favorito_vazio.png",
    price: 95.0,
    favorite: true,
    on_sale: true,
    sale_percent: 15.0,
  },
  {
    id: 22,
    name: "Blusa ombro a ombro feminina",
    image: "../../../../assets/favorito_vazio.png",
    price: 65.4,
    favorite: false,
    on_sale: true,
    sale_percent: 10.0,
  },
  {
    id: 23,
    name: "Tênis casual feminino - sola plataforma",
    image: "../../../../assets/favorito_vazio.png",
    price: 170.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 24,
    name: "Saia curta feminina - veludo",
    image: "../../../../assets/favorito_vazio.png",
    price: 88.5,
    favorite: false,
    on_sale: true,
    sale_percent: 22.5,
  },
  {
    id: 25,
    name: "Bota cano curto feminina - couro sintético",
    image: "../../../../assets/favorito_vazio.png",
    price: 220.0,
    favorite: true,
    on_sale: true,
    sale_percent: 12.0,
  },
  {
    id: 26,
    name: "Suéter feminino - lã acrílica",
    image: "../../../../assets/favorito_vazio.png",
    price: 130.3,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 27,
    name: "Short saia feminino - poliéster",
    image: "../../../../assets/favorito_vazio.png",
    price: 72.0,
    favorite: true,
    on_sale: true,
    sale_percent: 18.5,
  },
  {
    id: 28,
    name: "Blusa social feminina - manga longa",
    image: "../../../../assets/favorito_vazio.png",
    price: 90.7,
    favorite: false,
    on_sale: true,
    sale_percent: 14.0,
  },
  {
    id: 29,
    name: "Vestido midi feminino - estampa geométrica",
    image: "../../../../assets/favorito_vazio.png",
    price: 135.0,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 30,
    name: "Bolsa transversal feminina - couro ecológico",
    image: "../../../../assets/favorito_vazio.png",
    price: 125.0,
    favorite: false,
    on_sale: true,
    sale_percent: 10.0,
  },
];

export default function Pijamas() {
  const [paginaPresente, setPaginaPresente] = useState(1);

  function gerarPagina(): roupa_lista[] {
    let lista: roupa_lista[] = [];
    for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
      lista.push(roupas_teste[i]);
    }
    return lista;
  }
  return (
    <>
      <div className={style.filtro}>
        <div className={style.buscaInput}>
          <div className={style.header}>
            <input
              type="text"
              className={style.busca}
              placeholder="Pesquise pelo produto..."
            />
            <button className={style.botaoBusca}></button>
          </div>
        </div>
        <div className={style.botoes}>
          <button className={style.genero}>
            <div>
              <div></div>
              <p>Gênero</p>
            </div>

            <img src={vector} alt="" />
          </button>
          <button className={style.tipo}>
            <div>
              <div></div>
              <p>Tipo</p>
            </div>

            <img src={vector} alt="" />
          </button>
          <button className={style.estacao}>
            <div>
              <div></div>
              <p>Estação</p>
            </div>

            <img src={vector} alt="" />
          </button>
        </div>
      </div>

      <div className={style.lista_cards}>
        {gerarPagina().map((roupa) => (
          <Roupa
            key={roupa.id}
            id={roupa.id}
            favorite={roupa.favorite}
            image={roupa.image}
            name={roupa.name}
            on_sale={roupa.on_sale}
            sale_percent={roupa.sale_percent}
            price={roupa.price}
          />
        ))}
      </div>
      <div className={style.navegador}>
        <ul>
          <li>
            <img
              src={anterior}
              alt=""
              onClick={() => {
                if (paginaPresente > 1) {
                  setPaginaPresente(() => paginaPresente - 1);
                }
              }}
            />
            {/* Primeiro */}
          </li>
          {paginaPresente === 1 ? (
            <div className={style.primeiraPagina}>
              <li onClick={() => setPaginaPresente(() => paginaPresente)}>
                {paginaPresente}
              </li>
            </div>
          ) : paginaPresente != roupas_teste.length / 5 - 1 &&
            paginaPresente != roupas_teste.length / 5 ? (
            <li onClick={() => setPaginaPresente(() => paginaPresente - 1)}>
              {paginaPresente - 1}
            </li>
          ) : (
            <li onClick={() => setPaginaPresente(() => paginaPresente - 2)}>
              {paginaPresente - 2}
            </li>
          )}

          {/* Segundo */}
          {paginaPresente > 1 &&
          paginaPresente != roupas_teste.length / 5 - 1 &&
          paginaPresente != roupas_teste.length / 5 ? (
            <div className={style.primeiraPagina}>
              <li onClick={() => setPaginaPresente(() => paginaPresente)}>
                {paginaPresente}
              </li>
            </div>
          ) : 
            paginaPresente == roupas_teste.length / 5 - 1  ? (
            <li onClick={() => setPaginaPresente(() => paginaPresente - 1)}>
              {paginaPresente - 1}
            </li>
          ) : null}
          {paginaPresente == 1 ? (
            <li onClick={() => setPaginaPresente(() => paginaPresente + 1)}>
              {paginaPresente + 1}
            </li>
          ) : null}

          <li>...</li>

          {/* Terceiro */}
          {paginaPresente === roupas_teste.length / 5 - 1 ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() =>
                  setPaginaPresente(() => roupas_teste.length / 5 - 1)
                }
              >
                {roupas_teste.length / 5 - 1}
              </li>
            </div>
          ) : (
            <li
              onClick={() =>
                setPaginaPresente(() => roupas_teste.length / 5 - 1)
              }
            >
              {roupas_teste.length / 5 - 1}
            </li>
          )}

          {/* Quarto */}
          {paginaPresente === roupas_teste.length / 5 ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() => setPaginaPresente(() => roupas_teste.length / 5)}
              >
                {roupas_teste.length / 5}
              </li>
            </div>
          ) : (
            <li
              onClick={() => setPaginaPresente(() => roupas_teste.length / 5)}
            >
              {roupas_teste.length / 5}
            </li>
          )}

          <li>
            <img
              src={posterior}
              alt=""
              onClick={() => {
                if (paginaPresente + 1 < (roupas_teste.length + 1) / 5) {
                  setPaginaPresente(() => paginaPresente + 1);
                }
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
