import style from "./style.module.css";
import vector from "../../assets/Vector.png";
import Roupa from "../../componentes/roupa/roupa";
import anterior from "../../assets/anterior.png";
import posterior from "../../assets/prox.png";

import { useEffect, useState } from "react";
import { pijama } from "../../types/types";
import { useParams } from "react-router-dom";
import axios from "axios";

export const roupas_teste = [
  {
    id: 1,
    name: "Pijama de Algodão Azul",
    description: "Pijama confortável de algodão com estampa minimalista.",
    image:
      "https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp",
    price: 89.9,
    season: "Inverno",
    type: "Adulto",
    gender: "Masculino",
    size: [
      { size: "PP", stock_quantity: 3 },
      { size: "P", stock_quantity: 10 },
      { size: "M", stock_quantity: 15 },
      { size: "G", stock_quantity: 8 },
      { size: "GG", stock_quantity: 5 },
    ],
    favorite: false,
    on_sale: true,
    sale_percent: 15,
  },
  {
    id: 2,
    name: "Pijama Rosa de Seda",
    description: "Conjunto de pijama de seda macia e elegante.",
    image:
      "https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp",
    price: 129.9,
    season: "Verão",
    type: "Adulto",
    gender: "Feminino",
    size: [
      { size: "PP", stock_quantity: 0 },
      { size: "P", stock_quantity: 6 },
      { size: "M", stock_quantity: 4 },
      { size: "G", stock_quantity: 13 },
      { size: "GG", stock_quantity: 4 },
    ],
    favorite: false,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 3,
    name: "Pijama Infantil Estampado",
    description: "Pijama divertido com estampas de personagens.",
    image:
      "https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp",
    price: 59.9,
    season: "Todos",
    type: "Infantil",
    gender: "Unisex",
    size: [
      { size: "PP", stock_quantity: 20 },
      { size: "P", stock_quantity: 18 },
      { size: "M", stock_quantity: 15 },
      { size: "G", stock_quantity: 12 },
      { size: "GG", stock_quantity: 10 },
    ],
    favorite: false,
    on_sale: true,
    sale_percent: 10,
  },
  {
    id: 4,
    name: "Pijama de Flanela Xadrez",
    description: "Pijama quentinho de flanela, ideal para o inverno.",
    image:
      "https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp",
    price: 99.9,
    season: "Inverno",
    type: "Adulto",
    gender: "Masculino",
    size: [
      { size: "M", stock_quantity: 14 },
      { size: "G", stock_quantity: 10 },
      { size: "GG", stock_quantity: 6 },
    ],
    favorite: false,
    on_sale: false,
    sale_percent: 0,
  },
  {
    id: 5,
    name: "Pijama Curto de Malha",
    description: "Conjunto de pijama curto e leve para noites quentes.",
    image:
      "https://photo-cdn2.icons8.com/Ud99xf8ebJW6EOZUG2Jw9uT-Vh4WNzthjhv2vamTFDQ/rs:fit:288:432/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.webp",
    price: 79.9,
    season: "Verão",
    type: "Adulto",
    gender: "Unisex",
    size: [
      { size: "P", stock_quantity: 10 },
      { size: "M", stock_quantity: 12 },
      { size: "G", stock_quantity: 8 },
    ],
    favorite: false,
    on_sale: true,
    sale_percent: 20,
  },
];

const estacoes = ["Inverno", "Verão", "Todos"];
const generos = ["Unisex", "Masculino", "Feminino", "Família", "Todos"];
const tipos = ["Adulto", "Infantil", "Todos"];
export default function Pijamas() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/pijamas/getAll")
      .then((response) => {
        setListaPijamas(response.data);
        setListaTodosPijamas(response.data)
        setNumPijamas(response.data.length);
      })
      .catch((error) => console.log("Algo deu errado: " + error));
  }, []);

  const [listaTodosPijamas,setListaTodosPijamas] = useState<pijama[]>()
  const [listaPijamas, setListaPijamas] = useState<pijama[]>();
  const [listaPijamasPagina, setListaPijamasPagina] = useState<pijama[]>();
  const [numPijamas, setNumPijamas] = useState(listaPijamasPagina?.length);

  const [filtros, setFiltros] = useState(0);

  const [paginaPresente, setPaginaPresente] = useState(1);

  const [generoFiltro, setGeneroFiltro] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(false);
  const [estacaoFiltro, setEstacaoFiltro] = useState(false);

  const [pijamaBusca, setPijamaBusca] = useState<pijama[]>();
  const [Pesquisa, setPesquisa] = useState(false);
  const [Busca, setBusca] = useState("");

  const [genero, setGenero] = useState(false);
  const [tipo, setTipo] = useState(false);
  const [estacao, setEstacao] = useState(false);

  const { pijamaTipo } = useParams();

  useEffect(() => {
    if (pijamaTipo === "masculino") {
      setListaPijamas(listaTodosPijamas)
      setListaPijamasPagina(listaTodosPijamas)
      filtrarGenero("Masculino");
    } else if (pijamaTipo === "feminino") {
      setListaPijamas(listaTodosPijamas)
      setListaPijamasPagina(listaTodosPijamas)
      filtrarGenero("Feminino");
    } else if (pijamaTipo === "infantil") {
      setListaPijamas(listaTodosPijamas)
      setListaPijamasPagina(listaTodosPijamas)
      filtrarTipo("Infantil");
    } else {
      setNumPijamas(listaPijamas?.length);
      gerarPagina();
    }
  }, [pijamaTipo]);
  useEffect(() => {
    gerarPagina();
  }, []);
  useEffect(() => {
    gerarPagina();
  }, [paginaPresente]);
  useEffect(() => {
    gerarPagina();
  }, [listaPijamas, filtros]);

  function gerarPagina() {
    let lista: pijama[] = [];
    if (listaPijamas) {
      for (let i = (paginaPresente - 1) * 12; i < paginaPresente * 12; i++) {
        if (i >= listaPijamas?.length) {
          break;
        }

        lista.push(listaPijamas[i]);
      }
    }
    setListaPijamasPagina(lista);

    return lista;
  }

  function paginaTotal(): number {
    let num = 1;
    if (listaPijamas && numPijamas) {
      num = Math.ceil(numPijamas / 12);
    } else {
      return num;
    }
    if (num < 2) {
      return 1;
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
    if ((filtros === 0 || reset === true)&& listaPijamas)  {
      let listaTemp = listaPijamas.filter((roupa) => roupa.gender == genero);

      lista = listaTemp;

      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter((roupa) => roupa.gender == genero);
        lista = listaTemp;
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
    if ((filtros === 0 || reset === true)&&listaPijamas) {
      let listaTemp = listaPijamas.filter((roupa) => roupa.type == tipo);

      lista = listaTemp;

      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter((roupa) => roupa.type == tipo);

        lista = listaTemp;
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
    if ((filtros === 0 || reset === true)&&listaPijamas) {
      let listaTemp = listaPijamas.filter((roupa) => roupa.season == estacao);

      lista = listaTemp;

      let num = filtros + 1;
      setFiltros(num);
    } else {
      if (listaPijamas) {
        let listaTemp = listaPijamas.filter((roupa) => roupa.season == estacao);

        lista = listaTemp;
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
  function buscarPijama(): pijama[] {
    let pijamaBuscar = listaPijamas?.filter((pijama) =>
      pijama.name.toLowerCase().includes(Busca)
    );
    if(pijamaBuscar){
      return pijamaBuscar;
    }else{
      return []
    }
    
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
                season={roupa.season}
                gender={roupa.gender}
                type={roupa.type}
                description={roupa.description}
                size={roupa.size}
              />
            ))
          )
        ) : listaPijamasPagina ? (
          listaPijamasPagina.map((roupa) => (
            <Roupa
              key={roupa.id}
              id={roupa.id}
              favorite={roupa.favorite}
              image={roupa.image}
              name={roupa.name}
              on_sale={roupa.on_sale}
              sale_percent={roupa.sale_percent}
              price={roupa.price}
              season={roupa.season}
              gender={roupa.gender}
              type={roupa.type}
              description={roupa.description}
              size={roupa.size}
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
                  setPaginaPresente(paginaPresente - 1);
                }
              }}
            />
          </li>
          {/* Primeiro */}
          {paginaTotal() >= 4 && (
            <>
              {paginaPresente < paginaTotal() - 1 ? (
                paginaPresente === 1 ? (
                  <li className={style.primeiraPagina}>{paginaPresente}</li>
                ) : (
                  <li>{paginaPresente - 1}</li>
                )
              ) : null}

              {paginaPresente === paginaTotal() - 1 && (
                <li>{paginaPresente - 2}</li>
              )}
              {paginaPresente === paginaTotal() && (
                <li>{paginaPresente - 3}</li>
              )}

              {paginaPresente < paginaTotal() - 1 ? (
                paginaPresente !== 1 ? (
                  <li className={style.primeiraPagina}>{paginaPresente}</li>
                ) : (
                  <li>{paginaPresente + 1}</li>
                )
              ) : null}

              {paginaPresente === paginaTotal() - 1 && (
                <li>{paginaPresente - 1}</li>
              )}
              {paginaPresente === paginaTotal() && (
                <li>{paginaPresente - 2}</li>
              )}

              <li>...</li>

              {paginaPresente === paginaTotal() - 1 ? (
                <li className={style.primeiraPagina}>{paginaTotal() - 1}</li>
              ) : (
                <li>{paginaTotal() - 1}</li>
              )}

              {paginaPresente === paginaTotal() ? (
                <li className={style.primeiraPagina}>{paginaTotal()}</li>
              ) : (
                <li>{paginaTotal()}</li>
              )}
            </>
          )}
          {paginaTotal() === 3 && (
            <>
              {paginaPresente != paginaTotal() ? (
                paginaPresente === 1 ? (
                  <li className={style.primeiraPagina}>{paginaPresente}</li>
                ) : (
                  <li>{paginaPresente - 1}</li>
                )
              ) : (
                <li>{paginaPresente - 2}</li>
              )}

              {paginaPresente != paginaTotal() ? (
                paginaPresente === 1 ? (
                  <li>{paginaPresente + 1}</li>
                ) : (
                  <li className={style.primeiraPagina}>{paginaPresente}</li>
                )
              ) : (
                <li>{paginaPresente - 1}</li>
              )}

              <li>...</li>

              {paginaPresente === paginaTotal() ? (
                <li className={style.primeiraPagina}>{paginaTotal()}</li>
              ) : (
                <li>{paginaTotal()}</li>
              )}
            </>
          )}

          {paginaTotal() === 2 && (
            <>
              {paginaPresente === 1 ? (
                <li className={style.primeiraPagina}>{paginaPresente}</li>
              ) : null}
              {paginaPresente === 2 ? (
                <li className={style.primeiraPagina}>{paginaPresente}</li>
              ) : null}

              <li>...</li>
            </>
          )}
          {paginaTotal() === 1 && (
            <>
              {paginaPresente === 1 ? (
                <li className={style.primeiraPagina}>{paginaPresente}</li>
              ) : null}

              <li>...</li>
            </>
          )}
          <li>
            <img
              src={posterior}
              alt=""
              onClick={() => {
                if (paginaTotal() > 1) {
                  if (paginaTotal() < 3) {
                    if (paginaPresente + 1 <= paginaTotal() + 1) {
                      setPaginaPresente(paginaPresente + 1);
                    }
                  } else {
                    if (paginaPresente + 1 < paginaTotal() + 1) {
                      setPaginaPresente(paginaPresente + 1);
                    }
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
