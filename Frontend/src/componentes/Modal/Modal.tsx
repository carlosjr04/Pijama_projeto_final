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
    ) */,
    cep: z.string().nonempty('Esse campo não pode ser vazio'),
    logradouro: z.string().nonempty('Esse campo não pode ser vazio'),
    uf: z.string().nonempty('Esse campo não pode ser vazio'),
    cidade: z.string().nonempty('Esse campo não pode ser vazio'),
    numero: z.string().nonempty('Esse campo não pode ser vazio'),
    bairro: z.string().nonempty('Esse campo não pode ser vazio'),
});

export default function Modal({isOpen, handleClose} : ModalProps) {
    const [activeStep, setActiveStep] = useState(1);
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(clientSchema)
    });

    function processClientData(data) {
        /* Faz alguma coisa */
        console.log(data);
        reset();
    }

    function sendOrder(){
        /* Faz alguma coisa */
    }

    if (!isOpen) return null;
    return(
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {activeStep === 1 ? (
                    <> {/* Tela de dados */}
                        <h3>Dados</h3>
                        <form onSubmit={handleSubmit(processClientData)}>
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
                            <ModalButton onClick={() => setActiveStep(2)}>ENVIAR</ModalButton>
                        </form>
                </>
                ) : (
                    <> {/* Tela de pagamento */}
                        <h3>Pagamento</h3>
                        <ModalButton onClick={() => setActiveStep(1)}>
                            <img src={arrowIcon}></img>
                            <span>VOLTAR</span>
                        </ModalButton>
                        <ModalButton onClick={sendOrder}>ENVIAR</ModalButton>
                    </>
                )}
                
            </div>
        </div>
    )
}