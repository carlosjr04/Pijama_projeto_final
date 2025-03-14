import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
/* import cpf from 'cpf' */
import { zodResolver } from "@hookform/resolvers/zod";
import ModalButton from "../ModalButton/ModalButton";
import arrowIcon from "../../assets/left-arrow-icon.svg";
import useCartStore from "../../stores/CartStore";
import axios from "axios";
import useCartPreco from "../../stores/CartPreco";
import useCartDados, { pijamaDados } from "../../stores/CartDados";
import { ItemSale } from "../../types/types";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const clientSchema = z.object({
  nome: z.string().nonempty("Esse campo não pode ser vazio"),
  cpf: z.string().nonempty() /* .refine(
        value => {cpf.isValid(value)},
        'CPF inválido'
    ), */,
  cep: z.string().nonempty("Esse campo não pode ser vazio"),
  logradouro: z.string().nonempty("Esse campo não pode ser vazio"),
  uf: z.string().nonempty("Esse campo não pode ser vazio"),
  cidade: z.string().nonempty("Esse campo não pode ser vazio"),
  numero: z.string().nonempty("Esse campo não pode ser vazio"),
  bairro: z.string().nonempty("Esse campo não pode ser vazio"),
});

export default function Modal({ isOpen, handleClose }: ModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [payment, setPayment] = useState<"Debit Card" | "Credit Card" | "Pix">(
    "Pix"
  );
  const [clientData, setClientData] = useState<any>(null);

  const [creditPayment, setCreditPayment] = useState(5);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearPreco = useCartPreco((state) => state.clearPreco);
  const cart = useCartStore((state) => state.cart);
  const precoTotal = useCartPreco((state) => state.preco);


  const addToDados = useCartDados((state) => state.addToDados);
  const clearDados = useCartDados((state) => state.clearDados);
  const clearPrecoDados = useCartDados((state) => state.clearPreco);
  const precoInicial = useCartDados((state) => state.precoInicial);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
  });

  function processClientData(data: any) {
    /* Faz alguma coisa */
    setClientData(data);
    reset();
    setActiveStep(2);
  }

  function sendOrder(data: any) {
    /* Faz alguma coisa */
    const cartItemsSales: pijamaDados[] = cart.map((cartItem) => ({
      pijamaID: cartItem.code,
      size: cartItem.size.size,
      quantity: cartItem.quantity,
    }));

    cartItemsSales.forEach((item) => addToDados(item));

    precoInicial(precoTotal);

    precoInicial(precoTotal);
    let itemSale: ItemSale = {
      pajamas: cartItemsSales,
      buyer_name: data.nome,
      cpf: data.cpf,
      price: precoTotal,
      payment_method: payment,
      address: data.logradouro,
      installments: Number(creditPayment),
      card_number: data.uf,
      city: data.cidade,
      neighborhood: data.bairro,
      number: data.numero,
      state: data.bairro,
      zip_code: data.cep,
    };
    console.log(itemSale);
    axios
      .post("http://localhost:3000/sales", itemSale)
      .then(() => console.log("compra realizada"))
      .catch((error) => console.log("Algo deu errado: " + error));

    clearCart();
    clearPreco();
    clearDados();
    clearPrecoDados();
    setActiveStep(3);
  }

  return isOpen ? (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {activeStep === 1 /* Tela de dados do cliente */ && (
          <>
            <h3>Dados</h3>
            <form>
              <input
                type="text"
                placeholder="Nome completo"
                {...register("nome")}
              />
              {errors.nome && (
                <span className={styles.warning}>{errors.nome.message}</span>
              )}
              <input type="text" placeholder="CPF" {...register("cpf")} />
              {errors.cpf && (
                <span className={styles.warning}>{errors.cpf.message}</span>
              )}
              <input type="text" placeholder="CEP" {...register("cep")} />
              {errors.cep && (
                <span className={styles.warning}>{errors.cep.message}</span>
              )}
              <input
                type="text"
                placeholder="Logradouro"
                {...register("logradouro")}
              />
              {errors.logradouro && (
                <span className={styles.warning}>
                  {errors.logradouro.message}
                </span>
              )}
              <div className={styles.inputGroup}>
                <input
                  className={styles.smallInput}
                  type="text"
                  placeholder="UF"
                  {...register("uf")}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  {...register("cidade")}
                />
              </div>
              {errors.uf && (
                <span className={styles.warning}>{errors.uf.message}</span>
              )}
              {errors.cidade && (
                <span className={styles.warning}>{errors.cidade.message}</span>
              )}
              <div className={styles.inputGroup}>
                <input
                  className={styles.smallInput}
                  type="text"
                  placeholder="Número"
                  {...register("numero")}
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  {...register("bairro")}
                />
              </div>
              {errors.numero && (
                <span className={styles.warning}>{errors.numero.message}</span>
              )}
              {errors.bairro && (
                <span className={styles.warning}>{errors.bairro.message}</span>
              )}
              <ModalButton onClick={handleSubmit(processClientData)}>
                ENVIAR
              </ModalButton>
            </form>
          </>
        )}

        {activeStep === 2 /* Tela de pagamento */ && (
          <>
            <h3>Pagamento</h3>
            <div>
              <select
                id={styles.paymentSelector}
                defaultValue={payment}
                onChange={(e) => {
                  if (e.target.value === "boleto") {
                    e.target.value = "Pix";
                  }
                  if (
                    e.target.value === "Credit Card" ||
                    e.target.value === "Debit Card" ||
                    e.target.value === "Pix"
                  ) {
                    setPayment(e.target.value);
                  }
                }}
              >
                <option value="boleto">Boleto</option>
                <option value="pix">PIX</option>
                <option value="credito">Cartão de Crédito</option>
              </select>
            </div>
            {payment === "Credit Card" && (
              <div>
                <select
                  defaultValue={creditPayment}
                  onChange={(e) => setCreditPayment(Number(e.target.value))}
                >
                  <option value="1x">Parcelamento 1x</option>
                  <option value="2x">Parcelamento 2x</option>
                  <option value="3x">Parcelamento 3x</option>
                  <option value="4x">Parcelamento 4x</option>
                  <option value="5x">Parcelamento 5x</option>
                </select>
                <input
                  id={styles.cardNumberInput}
                  type="text"
                  placeholder="Número do cartão"
                />
              </div>
            )}
            <div className={styles.buttonsContainer}>
              <ModalButton onClick={() => setActiveStep(1)}>
                <img src={arrowIcon} />
                VOLTAR
              </ModalButton>
              <ModalButton
                onClick={(() => {
                  console.log("Dados enviados para sendOrder:", clientData);
                  sendOrder(clientData);
                })}
              >
                ENVIAR
              </ModalButton>
            </div>
          </>
        )}
        {activeStep === 3 /* Tela de conclusão do pedido */ && (
          <div className={styles.messageContainer}>
            <div>
              <h3>Sua compra foi concluída!</h3>
              <p>Obrigado por comprar conosco!</p>
            </div>
            <button id={styles.closeButton} onClick={handleClose}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
