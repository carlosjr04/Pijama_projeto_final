import styles from './styles.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { z } from 'zod'
/* import cpf from 'cpf' */
import { zodResolver } from '@hookform/resolvers/zod';
import ModalButton from '../ModalButton/ModalButton';
import arrowIcon from '../../assets/left-arrow-icon.svg'

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const clientSchema = z.object({
    nome: z.string().nonempty('Esse campo não pode ser vazio'),
    cpf: z.string().nonempty()/* .refine(
        value => {cpf.isValid(value)},
        'CPF inválido'
    ), */,
    cep: z.string().nonempty('Esse campo não pode ser vazio'),
    logradouro: z.string().nonempty('Esse campo não pode ser vazio'),
    uf: z.string().nonempty('Esse campo não pode ser vazio'),
    cidade: z.string().nonempty('Esse campo não pode ser vazio'),
    numero: z.string().nonempty('Esse campo não pode ser vazio'),
    bairro: z.string().nonempty('Esse campo não pode ser vazio'),
});

export default function Modal({isOpen, handleClose} : ModalProps) {
    const [activeStep, setActiveStep] = useState(1);
    const [payment, setPayment] = useState('Forma de pagamento');
    const [creditPayment, setCreditPayment] = useState('Parcelamento 5x');
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(clientSchema)
    });

    function processClientData() {
        /* Faz alguma coisa */
        reset();
        setActiveStep(2);
    }

    function sendOrder(){
        /* Faz alguma coisa */
        setActiveStep(3);
    }

    
    return isOpen ? (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {activeStep === 1 && ( /* Tela de dados do cliente */
                <> 
                    <h3>Dados</h3>
                    <form>
                        <input
                            type='text'
                            placeholder='Nome completo'
                            {...register('nome')}
                        />
                        {errors.nome && <span className={styles.warning}>{errors.nome.message}</span>}
                        <input
                            type='text'
                            placeholder='CPF'
                            {...register('cpf')}
                        />
                        {errors.cpf && <span className={styles.warning}>{errors.cpf.message}</span>}
                        <input
                            type='text'
                            placeholder='CEP'
                            {...register('cep')}
                        />
                        {errors.cep && <span className={styles.warning}>{errors.cep.message}</span>}
                        <input
                            type='text'
                            placeholder='Logradouro'
                            {...register('logradouro')}
                        />
                        {errors.logradouro && <span className={styles.warning}>{errors.logradouro.message}</span>}
                        <div className={styles.inputGroup}>
                            <input
                                className={styles.smallInput}
                                type='text'
                                placeholder='UF'
                                {...register('uf')}
                            />
                            <input
                                type='text'
                                placeholder='Cidade'
                                {...register('cidade')}
                            />
                        </div>
                        {errors.uf && <span className={styles.warning}>{errors.uf.message}</span>}
                        {errors.cidade && <span className={styles.warning}>{errors.cidade.message}</span>}
                        <div className={styles.inputGroup}>
                            <input
                                className={styles.smallInput}
                                type='text'
                                placeholder='Número'
                                {...register('numero')}
                            />
                            <input
                                type='text'
                                placeholder='Bairro'
                                {...register('bairro')}
                            />
                        </div>
                        {errors.numero && <span className={styles.warning}>{errors.numero.message}</span>}
                        {errors.bairro && <span className={styles.warning}>{errors.bairro.message}</span>}
                        <ModalButton onClick={handleSubmit(processClientData)}>ENVIAR</ModalButton>
                    </form>
                </>)
                }
                
                {activeStep === 2 && ( /* Tela de pagamento */
                <> 
                    <h3>Pagamento</h3>
                    <div>
                        <select id={styles.paymentSelector} defaultValue={payment}
                        onChange={(e) => setPayment(e.target.value)}>
                            <option value='boleto'>Boleto</option>
                            <option value='pix'>PIX</option>
                            <option value='credito'>Cartão de Crédito</option>
                        </select>
                    </div>
                    {payment === 'credito' && 
                        <div>
                            <select defaultValue={creditPayment}
                            onChange={(e) => setCreditPayment(e.target.value)}>
                                <option value='1x'>Parcelamento 1x</option>
                                <option value='2x'>Parcelamento 2x</option>
                                <option value='3x'>Parcelamento 3x</option>
                                <option value='4x'>Parcelamento 4x</option>
                                <option value='5x'>Parcelamento 5x</option>
                            </select>
                            <input id={styles.cardNumberInput}
                                type='text'
                                placeholder='Número do cartão'
                            />
                            
                        </div>}
                    <div className={styles.buttonsContainer}>
                        <ModalButton onClick={() => setActiveStep(1)}>
                            <img src={arrowIcon}/>
                            VOLTAR
                        </ModalButton>
                        <ModalButton onClick={sendOrder}>ENVIAR</ModalButton>
                    </div>
                </>)}
                {activeStep === 3 &&( /* Tela de conclusão do pedido */
                    <div className={styles.messageContainer}>
                        <div>
                            <h3>Sua compra foi concluída!</h3>
                            <p>Obrigado por comprar conosco!</p>
                        </div>
                        <button id={styles.closeButton} onClick={handleClose}>X</button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}