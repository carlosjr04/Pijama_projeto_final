import style from "./style.module.css";
import vector from "../../assets/Vector.png"

export default function Pijamas() {
  return (
    <>
      <div className={style.filtro}>
        <div className={style.buscaInput}>
          <input type="text" className={style.busca} placeholder="Pesquise pelo produto..."/>
          <button className={style.botaoBusca}></button>
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
    </>
  );
}
