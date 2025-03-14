import { useForm } from "react-hook-form";
import style from "./style.module.css";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import estrelaCheia from "../../assets/estrelaCheiaBranca.png";
import estrelaVazia from "../../assets/estrelaVaziaBranca.png";
import estrelaMeia from "../../assets/estrelaMeiaBranca.png";

interface IFeedback {
  name: string;
  description: string;
  rating: number;
}
interface IFeedbackSubmit {
  name: string;
  description: string;
}
const FeedbackSchema = z.object({
  name: z.string().nonempty("• o nome não pode estar em branco"),
  description: z.string().nonempty("• a descrição não pode estar em branco"),
});

export default function Feedback() {
  const [rating, setRating] = useState<number>(3.5);
  const [feedback, setFeedback] = useState<IFeedback>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FeedbackSchema),
  });

  function settingFeedback(data: IFeedbackSubmit) {
    let feedbackSubmit: IFeedback = {
      name: data.name,
      description: data.description,
      rating: rating,
    };
    setFeedback(feedbackSubmit);
    console.log(feedbackSubmit);
    axios
      .post("http://localhost:3000/feedbacks", feedbackSubmit)
      .then(() => console.log("Feedback registrado!!!!"))
      .catch((error) => console.log("Algo deu errado: " + error));
  }
  function criarEstrelas() {
    let listaEstrela = [];
    let ratingEstrela = rating;
    for (let i = 0; i < 5; i++) {
      if (ratingEstrela >= 1) {
        listaEstrela.push(estrelaCheia);
      } else if (ratingEstrela > 0) {
        listaEstrela.push(estrelaMeia);
      } else {
        listaEstrela.push(estrelaVazia);
      }
      ratingEstrela -= 1;
    }
    return listaEstrela;
  }
  return (
    <div className={style.container}>
      <div className={style.mainDiv}>
        <div className={style.subMainDiv}>
          <h1 className={style.title}> Feedback </h1>
          <p className={style.innerText}>
            {" "}
            Fale um pouco sobre a sua experiência com a nossa loja!{" "}
          </p>

          <form onSubmit={handleSubmit(settingFeedback)} className={style.form}>
            <input
              className={style.name}
              placeholder="Nome completo"
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <span className={style.errorMessage}>{errors.name.message}</span>
            )}

            <input
              className={style.description}
              placeholder="Descrição detalhada"
              type="text"
              {...register("description")}
            />
            {errors.description && (
              <span className={style.errorMessage}>
                {errors.description.message}
              </span>
            )}

            <div className={style.estrelas}>
              {criarEstrelas().map((estrela,key) => (
                <div className={style.divEstrelaPai}>
                    <div className={style.meiaDiv} onClick={()=>setRating(key+0.5)}></div>
                    <img src={estrela} alt="" />
                    <div className={style.meiaDivDireita} onClick={()=>setRating(key+1)}></div>
                </div>
                
              ))}
            </div>

            <button
              className={`${
                isSubmitting
                  ? style.disabledSendButton
                  : style.enabledSendButton
              }`}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "ENVIADO" : "ENVIAR"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
