import { feedback } from "../../../types/types";
import estrelaCheia from "../../../assets/estrelaCheia.png";
import estrelaMeia from "../../../assets/estrelaMeia.png";
import estrelaVazia from "../../../assets/estrelaVazia.png";
import style from "./style.module.css";

export default function Feedback(feedback: feedback) {

  function gerarEstrela(rating: number) {
    
    let listaEstrela = [];
    for (let i = 0; i < 5; i++) {
        if (rating >= 1) {
            listaEstrela.push(estrelaCheia); 
        } else if (rating > 0) {
            listaEstrela.push(estrelaMeia); 
        } else {
            listaEstrela.push(estrelaVazia); 
        }
        rating -= 1; 
    }
    return listaEstrela;
  }
  return (
    <>
      <div className={style.feedbackUnidade}>
        <h2>{feedback.name}</h2>
        <div className={style.estrelas} >
          {gerarEstrela(feedback.rating).map((estrela) => (
            <img src={estrela} alt="" />
          ))}
        </div>

        <p>{feedback.description}</p>
      </div>
    </>
  );
}
