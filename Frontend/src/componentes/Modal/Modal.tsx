import styles from './styles.module.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import cpf from 'cpf'
import { zodResolver } from '@hookform/resolvers/zod';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const clientSchema = z.object({
    nome: z.string().nonempty('Esse campo não pode estar vazio'),
    cpf: z.string().nonempty('Esse campo não pode estar vazio').refine(
        value => {cpf.isValid(value)},
        'CPF inválido'
    ),
    cep: z.string().nonempty('Esse campo não pode estar vazio'),
    logradouro: z.string().nonempty('Esse campo não pode estar vazio'),
    uf: z.string().nonempty('Esse campo não pode estar vazio').max(2),
    cidade: z.string().nonempty('Esse campo não pode estar vazio'),
    numero: z.number().positive('Digite apenas números positivos'),
    bairro: z.string().nonempty('Esse campo não pode estar vazio'),
});

export default function Modal({isOpen, handleClose} : ModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(clientSchema)
    });

    function processClientData(data) {
        /* Faz alguma coisa */
        console.log(data);
        reset();
    }

    if (!isOpen) return null;
    return(
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Dados</h3>
                <form onSubmit={handleSubmit(processClientData)}>
                    <input
                        type='text'
                        placeholder='Nome completo'
                        {...register('nome')}
                    />
                    <input
                        type='text'
                        placeholder='CPF'
                        {...register('cpf')}
                    />
                    <input
                        type='text'
                        placeholder='CEP'
                        {...register('cep')}
                    />
                    <input
                        type='text'
                        placeholder='Logradouro'
                        {...register('logradouro')}
                    />
                
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
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.smallInput}
                            type='number'
                            min='1'
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
                    <button id={styles.submitButton}>ENVIAR</button>
                </form>
            </div>
        </div>
    )
}