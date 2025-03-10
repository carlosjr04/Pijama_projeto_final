import style from "./style.module.css";
import vector from "../../assets/Vector.png";
import Roupa from "./componentes/roupa/roupa";
import anterior from "../../assets/anterior.png";
import posterior from "../../assets/prox.png";

import { useEffect, useState } from "react";
import { roupa_lista } from "../../types/types";

const roupas_teste = [
  {
    id: 1,
    name: "Pijama feminino longo - estampa poá",
    image: "../../../../assets/pijama_feminino_poa.png",
    price: 78.8,
    favorite: true,
    on_sale: true,
    sale_percent: 15.0,
    type: "Adulto",
    gender: "Feminino",
    estacao: "Inverno",
  },
  {
    id: 2,
    name: "Camiseta masculina básica - branca",
    image: "../../../../assets/camiseta_branca.png",
    price: 39.9,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
    type: "Todos",
    gender: "Masculino",
    estacao: "Verão",
  },
  {
    id: 3,
    name: "Vestido floral midi",
    image: "../../../../assets/vestido_floral.png",
    price: 129.9,
    favorite: true,
    on_sale: true,
    sale_percent: 20.0,
    type: "Infantil",
    gender: "Feminino",
    estacao: "Todos",
  },
  {
    id: 4,
    name: "Bermuda jeans masculina",
    image: "../../../../assets/bermuda_jeans.png",
    price: 89.9,
    favorite: false,
    on_sale: true,
    sale_percent: 10.0,
    type: "Adulto",
    gender: "Masculino",
    estacao: "Verão",
  },
  {
    id: 5,
    name: "Blusa de lã feminina - bege",
    image: "../../../../assets/blusa_lã.png",
    price: 149.9,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
    type: "Todos",
    gender: "Feminino",
    estacao: "Inverno",
  },
  {
    id: 6,
    name: "Jaqueta de couro masculina - preta",
    image: "../../../../assets/jaqueta_couro.png",
    price: 299.9,
    favorite: false,
    on_sale: true,
    sale_percent: 25.0,
    type: "Infantil",
    gender: "Masculino",
    estacao: "Todos",
  },
  {
    id: 7,
    name: "Short esportivo feminino - rosa",
    image: "../../../../assets/short_esportivo.png",
    price: 59.9,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
    type: "Todos",
    gender: "Feminino",
    estacao: "Verão",
  },
  {
    id: 8,
    name: "Calça social masculina - preta",
    image: "../../../../assets/calca_social.png",
    price: 179.9,
    favorite: true,
    on_sale: true,
    sale_percent: 15.0,
    type: "Adulto",
    gender: "Masculino",
    estacao: "Todas",
  },
  {
    id: 9,
    name: "Blazer feminino - azul-marinho",
    image: "../../../../assets/blazer.png",
    price: 249.9,
    favorite: false,
    on_sale: true,
    sale_percent: 10.0,
    type: "Infantil",
    gender: "Todos",
    estacao: "Todos",
  },
  {
    id: 10,
    name: "Regata masculina esportiva - preta",
    image: "../../../../assets/regata_esportiva.png",
    price: 29.9,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
    type: "Todos",
    gender: "Masculino",
    estacao: "Verão",
  },
  {
    id: 11,
    name: "Suéter feminino de tricô - cinza",
    image: "../../../../assets/sueter_trico.png",
    price: 119.9,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
    type: "Infantil",
    gender: "Feminino",
    estacao: "Inverno",
  },
  {
    id: 12,
    name: "Camisa social masculina - azul claro",
    image: "../../../../assets/camisa_social.png",
    price: 139.9,
    favorite: false,
    on_sale: true,
    sale_percent: 20.0,
    type: "Adulto",
    gender: "Todos",
    estacao: "Todas",
  },
  {
    id: 13,
    name: "Jaqueta corta-vento unissex - cinza",
    image: "../../../../assets/jaqueta_cortavento.png",
    price: 199.9,
    favorite: true,
    on_sale: true,
    sale_percent: 30.0,
    type: "Todos",
    gender: "Unissex",
    estacao: "Todos",
  },
  {
    id: 14,
    name: "Calça moletom masculina - preta",
    image: "../../../../assets/calca_moletom.png",
    price: 89.9,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
    type: "Infantil",
    gender: "Todos",
    estacao: "Inverno",
  },
  {
    id: 15,
    name: "Macacão jeans feminino",
    image: "../../../../assets/macacao_jeans.png",
    price: 159.9,
    favorite: true,
    on_sale: true,
    sale_percent: 15.0,
    type: "Todos",
    gender: "Feminino",
    estacao: "Todas",
  },
  {
    id: 16,
    name: "Tênis esportivo unissex - branco",
    image: "../../../../assets/tenis_esportivo.png",
    price: 249.9,
    favorite: true,
    on_sale: true,
    sale_percent: 10.0,
    type: "Infantil",
    gender: "Unissex",
    estacao: "Todas",
  },
  {
    id: 17,
    name: "Saia midi plissada - bege",
    image: "../../../../assets/saia_midi.png",
    price: 99.9,
    favorite: false,
    on_sale: false,
    sale_percent: 0,
    type: "Todos",
    gender: "Feminino",
    estacao: "Todos",
  },
  {
    id: 18,
    name: "Casaco de lã masculino - cinza",
    image: "../../../../assets/casaco_la.png",
    price: 279.9,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
    type: "Infantil",
    gender: "Masculino",
    estacao: "Inverno",
  },
  {
    id: 19,
    name: "Casaco de lã masculino - cinza",
    image: "../../../../assets/casaco_la.png",
    price: 279.9,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
    type: "Adulto",
    gender: "Masculino",
    estacao: "Inverno",
  },
  {
    id: 20,
    name: "Casaco de lã masculino - cinza",
    image: "../../../../assets/casaco_la.png",
    price: 279.9,
    favorite: true,
    on_sale: false,
    sale_percent: 0,
    type: "Infantil",
    gender: "Masculino",
    estacao: "Inverno",
  },
];

const estacoes = ["Inverno", "Verão", "Todos"];
const generos = ["Unisex", "Masculino", "Feminino", "Família", "Todos"];
const tipos = ["Adulto", "Infantil", "Todos"];
export default function Pijamas() {
  const [listaPijamas, setListaPijamas] = useState<roupa_lista[]>(roupas_teste);
  const [numPijamas, setNumPijamas] = useState(roupas_teste.length);
  const [filtros, setFiltros] = useState(0);
  const [paginaPresente, setPaginaPresente] = useState(1);
  const [generoFiltro, setGeneroFiltro] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(false);
  const [estacaoFiltro, setEstacaoFiltro] = useState(false);

  const [pijamaBusca, setPijamaBusca] = useState<roupa_lista[]>();
  const [Pesquisa, setPesquisa] = useState(false);
  const [Busca, setBusca] = useState("");

  const [genero, setGenero] = useState(false);
  const [tipo, setTipo] = useState(false);
  const [estacao, setEstacao] = useState(false);

  useEffect(() => {
    gerarPagina();
  }, []);

  function gerarPagina() {
    let lista: roupa_lista[] = [];
    for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
      lista.push(roupas_teste[i]);
    }
    setListaPijamas(lista);
    return lista;
  }

  function paginaTotal(): number {
    let num = 1;
    if (listaPijamas) {
      num = Math.ceil(numPijamas / 5);
    } else {
      return num;
    }
    return num;
  }
  function filtrarGenero(genero: string) {
    setPaginaPresente(1);
    let lista = [];
    let reset = false;
    if (generoFiltro === true) {
      setFiltros(0);
      reset = true;
    }
    if (filtros === 0 || reset === true) {
      let listaTemp = roupas_teste.filter((roupa) => roupa.gender == genero);
      for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
        if (i >= listaTemp.length) {
          break;
        }
        lista.push(listaTemp[i]);
      }
      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter((roupa) => roupa.gender == genero);

        for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
          if (i >= listaTemp.length) {
            break;
          }
          lista.push(listaTemp[i]);
        }
      } else {
        alert("Não possui pijama com esses filtros");
        return 0;
      }
    }
    if (lista.length === 0) {
      alert("Não possui pijama com esses filtros");
      return 0;
    }
    setNumPijamas(lista.length);
    setListaPijamas(lista);
    setGeneroFiltro(true);
  }

  function filtrarTipo(tipo: string) {
    let lista = [];
    setPaginaPresente(1);
    let reset = false;

    if (tipoFiltro === true) {
      setFiltros(0);
      reset = true;
    }
    if (filtros === 0 || reset === true) {
      let listaTemp = roupas_teste.filter((roupa) => roupa.type == tipo);
      for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
        if (i >= listaTemp.length) {
          break;
        }
        lista.push(listaTemp[i]);
      }
      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter((roupa) => roupa.type == tipo);
        for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
          if (i >= listaTemp.length) {
            break;
          }
          lista.push(listaTemp[i]);
        }
      } else {
        alert("Não possui pijama com esses filtros");
        return 0;
      }
    }

    if (lista.length === 0) {
      alert("Não possui pijama com esses filtros");
      return 0;
    }
    setNumPijamas(lista.length);
    setListaPijamas(lista);
    setTipoFiltro(true);
  }

  function filtrarEstacao(estacao: string) {
    setPaginaPresente(1);
    let lista = [];
    let reset = false;
    if (estacaoFiltro === true) {
      setFiltros(0);
      reset = true;
    }
    if (filtros === 0 || reset === true) {
      let listaTemp = roupas_teste.filter((roupa) => roupa.estacao == estacao);
      for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
        if (i >= listaTemp.length) {
          break;
        }
        lista.push(listaTemp[i]);
      }
      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter(
          (roupa) => roupa.estacao == estacao
        );
        for (let i = (paginaPresente - 1) * 5; i < paginaPresente * 5; i++) {
          if (i >= listaTemp.length) {
            break;
          }
          lista.push(listaTemp[i]);
        }
      } else {
        alert("Não possui pijama com esses filtros");
        return 0;
      }
    }
    if (lista.length === 0) {
      alert("Não possui pijama com esses filtros");
      return 0;
    }
    setNumPijamas(lista.length);
    setListaPijamas(lista);
    setEstacaoFiltro(true);
  }
  function buscarPijama(): roupa_lista[] {
    let pijamaBuscar = listaPijamas.filter((pijama) =>
      pijama.name.toLowerCase().includes(Busca)
    );

    return pijamaBuscar;
  }
  function handleClick() {
    setPesquisa(true);
    setPijamaBusca(buscarPijama());
  }
  if (Busca == "" && Pesquisa == true) {
    setPijamaBusca(undefined);
    setPesquisa(false);
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
              value={Busca}
              onChange={(e) => {
                setBusca(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={handleClick}
              className={style.botaoBusca}
            ></button>
          </div>
        </div>
        <div className={style.botoes}>
          <button className={style.estacao} onClick={() => setGenero(!genero)}>
            <div className={style.botaoInicial}>
              <div className={style.tracoBotao}></div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginLeft: "12px" }}>Gênero</p>
              </div>
            </div>

            {genero ? (
              <ul className={style.listaEstacao}>
                <div className={style.tracoLista}></div>
                <div className={style.elementosFiltro}>
                  {generos.map((genero) => (
                    <div onClick={() => filtrarGenero(genero)}>
                      <li className={style.separador}></li>
                      <li style={{ marginLeft: "12px" }}>{genero}</li>
                    </div>
                  ))}
                </div>
              </ul>
            ) : null}
            <img src={vector} alt="" />
          </button>

          <button className={style.estacao}>
            <div className={style.botaoInicial} onClick={() => setTipo(!tipo)}>
              <div className={style.tracoBotao}></div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginLeft: "12px" }}>Tipo</p>
              </div>
            </div>

            {tipo ? (
              <ul className={style.listaEstacao}>
                <div className={style.tracoLista}></div>
                <div className={style.elementosFiltro}>
                  {tipos.map((tipo) => (
                    <div onClick={() => filtrarTipo(tipo)}>
                      <li className={style.separador}></li>
                      <li style={{ marginLeft: "12px" }}>{tipo}</li>
                    </div>
                  ))}
                </div>
              </ul>
            ) : null}
            <img src={vector} alt="" />
          </button>

          <button
            className={style.estacao}
            onClick={() => setEstacao(!estacao)}
          >
            <div className={style.botaoInicial}>
              <div className={style.tracoBotao}></div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginLeft: "12px" }}>Estação</p>
              </div>
            </div>

            {estacao ? (
              <ul className={style.listaEstacao}>
                <div className={style.tracoLista}></div>
                <div className={style.elementosFiltro}>
                  {estacoes.map((estacao) => (
                    <div onClick={() => filtrarEstacao(estacao)}>
                      <li className={style.separador}></li>
                      <li style={{ marginLeft: "12px" }}>{estacao}</li>
                    </div>
                  ))}
                </div>
              </ul>
            ) : null}
            <img src={vector} alt="" />
          </button>
        </div>
      </div>

      <div className={style.lista_cards}>
        {Pesquisa ? (
          pijamaBusca?.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10rem",
              }}
            >
              <h1 className={style.textoVazio}>Pijama não encontrado.</h1>
            </div>
          ) : (
            pijamaBusca?.map((roupa) => (
              <Roupa
                key={roupa.id}
                id={roupa.id}
                favorite={roupa.favorite}
                image={roupa.image}
                name={roupa.name}
                on_sale={roupa.on_sale}
                sale_percent={roupa.sale_percent}
                price={roupa.price}
                estacao={roupa.estacao}
                gender={roupa.gender}
                type={roupa.type}
              />
            ))
          )
        ) : listaPijamas ? (
          listaPijamas.map((roupa) => (
            <Roupa
              key={roupa.id}
              id={roupa.id}
              favorite={roupa.favorite}
              image={roupa.image}
              name={roupa.name}
              on_sale={roupa.on_sale}
              sale_percent={roupa.sale_percent}
              price={roupa.price}
              estacao={roupa.estacao}
              gender={roupa.gender}
              type={roupa.type}
            />
          ))
        ) : null}
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
                  gerarPagina();
                }
              }}
            />
            {/* Primeiro */}
          </li>
          {paginaPresente === 1 ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() => {
                  setPaginaPresente(() => paginaPresente);
                  gerarPagina();
                }}
              >
                {paginaPresente}
              </li>
            </div>
          ) : paginaPresente != paginaTotal() - 1 &&
            paginaPresente != paginaTotal() ? (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaPresente - 1);
                gerarPagina();
              }}
            >
              {paginaPresente - 1}
            </li>
          ) : (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaPresente - 2);
                gerarPagina();
              }}
            >
              {paginaPresente - 2}
            </li>
          )}

          {/* Segundo */}
          {paginaPresente > 1 &&
          paginaPresente != paginaTotal() - 1 &&
          paginaPresente != paginaTotal() ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() => {
                  setPaginaPresente(() => paginaPresente);
                  gerarPagina();
                }}
              >
                {paginaPresente}
              </li>
            </div>
          ) : paginaPresente == paginaTotal() - 1 ? (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaPresente - 1);
                gerarPagina();
              }}
            >
              {paginaPresente - 1}
            </li>
          ) : null}
          {paginaPresente == 1 ? (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaPresente + 1);
                gerarPagina();
              }}
            >
              {paginaPresente + 1}
            </li>
          ) : null}

          <li>...</li>

          {/* Terceiro */}
          {paginaTotal() === 1 ? null : paginaPresente === paginaTotal() - 1 ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() => {
                  setPaginaPresente(() => paginaTotal() - 1);
                  gerarPagina();
                }}
              >
                {paginaTotal() - 1}
              </li>
            </div>
          ) : (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaTotal() - 1);
                gerarPagina();
              }}
            >
              {paginaTotal() - 1}
            </li>
          )}

          {/* Quarto */}
          {paginaTotal() === 1 ? null : paginaPresente === paginaTotal() ? (
            <div className={style.primeiraPagina}>
              <li
                onClick={() => {
                  setPaginaPresente(() => paginaTotal());
                  gerarPagina();
                }}
              >
                {paginaTotal()}
              </li>
            </div>
          ) : (
            <li
              onClick={() => {
                setPaginaPresente(() => paginaTotal());
                gerarPagina();
              }}
            >
              {paginaTotal()}
            </li>
          )}

          <li>
            <img
              src={posterior}
              alt=""
              onClick={() => {
                if (paginaTotal() < 3) {
                  if (paginaPresente + 1 <= paginaTotal() + 1) {
                    setPaginaPresente(() => paginaPresente + 1);
                    gerarPagina();
                  }
                } else {
                  if (paginaPresente + 1 < paginaTotal() + 1) {
                    setPaginaPresente(() => paginaPresente + 1);
                    gerarPagina();
                  }
                }
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
