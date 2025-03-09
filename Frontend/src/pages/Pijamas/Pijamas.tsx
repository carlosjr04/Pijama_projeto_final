import style from "./style.module.css";
import vector from "../../assets/Vector.png";
import Roupa from "./componentes/roupa/roupa";

const roupas_teste = [
  {
    name: "Pijama feminino longo - estampa poá",
    preco: 78.8,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: true,
    desconto: true,
    desconto_porcentagem: 108.2,
  },
  {
    name: "Pijama feminino curto - floral",
    preco: 65.9,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: false,
    desconto: true,
    desconto_porcentagem: 95.0,
  },
  {
    name: "Pijama masculino longo - listrado",
    preco: 82.5,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: true,
    desconto: false,
    desconto_porcentagem: 0.0,
  },
  {
    name: "Pijama infantil - estampado",
    preco: 55.4,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: false,
    desconto: true,
    desconto_porcentagem: 88.3,
  },
  {
    name: "Camisola feminina - renda",
    preco: 70.2,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: true,
    desconto: true,
    desconto_porcentagem: 100.0,
  },
  {
    name: "Pijama masculino curto - liso",
    preco: 60.0,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: false,
    desconto: false,
    desconto_porcentagem: 0.0,
  },
  {
    name: "Pijama feminino longo - cetim",
    preco: 95.75,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: true,
    desconto: true,
    desconto_porcentagem: 110.0,
  },
  {
    name: "Pijama infantil - bichinhos",
    preco: 49.9,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: false,
    desconto: true,
    desconto_porcentagem: 85.5,
  },
  {
    name: "Robe feminino - plush",
    preco: 120.3,
    imagem: "../../../../assets/favorito_vazio.png",
    favorito: true,
    desconto: false,
    desconto_porcentagem: 0.0,
  },
];

export default function Pijamas() {
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
        {roupas_teste.map((roupa) => (
          <Roupa
            key={roupa.name}
            favorite={roupa.favorito}
            image={roupa.imagem}
            name={roupa.name}
            on_sale={roupa.desconto}
            sale_percent={roupa.desconto_porcentagem}
            price={roupa.preco}
          />
        ))}
      </div>
    </>
  );
}
