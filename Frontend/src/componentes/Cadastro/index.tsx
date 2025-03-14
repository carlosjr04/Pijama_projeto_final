import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import style from "./style.module.css"
import { z } from "zod"
import { useState } from "react"
import axios from "axios"


const UserSchema = z.object({
    name: z
        .string()
        .nonempty("• o nome pessoal não pode estar em branco")
        .regex(/^[^\d]+$/, "• números não são permitidos no nome pessoal."),
    username: z
        .string()
        .nonempty("• o nome de usuário não pode estar em branco")
        .regex(/^[^\s\u00C0-\u024F]+$/, "• espaços ou caracteres com acentos não são permitidos no nome de usuário."),
    email: z
        .string()
        .nonempty("• o email não pode estar em branco")
        .email("• digite um email válido"),
    password: z
        .string()
        .min(6, "• a senha deve conter pelo menos 6 caracteres")
        .regex(/^\S+$/, "• a senha não pode conter espaços"),
    confirmPassword: z
        .string()
        .nonempty("• a confirmação de senha é obrigatória.")
}).refine((data) => data.password === data.confirmPassword, {
        message: "• as senhas não coincidem",
        path: ["confirmPassword"]
    })

interface IUserType {
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword?: string
}

export default function Cadastro() {
    
    const [user, setUser] = useState<IUserType>()
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(UserSchema)
    })
    
    function settingUser (data: IUserType) {
        delete data.confirmPassword
        setUser(data)
        console.log(data)
        axios
            .post("http://localhost:3000/users", data)
            .then(() => console.log("Registrado com sucesso!!"))
            .catch((error) => console.log("Algo deu errado: " + error))
    }

    return (
        <div className={style.container}>
            <div className={style.mainDiv}>

                <h1>Registre-se</h1>

                <form onSubmit={handleSubmit(settingUser)}>
                    
                    <div>
                        <input
                            placeholder="Nome"
                            type="name"
                            {...register("name")}/>
                            {errors.name && 
                                <span 
                                    className={style.errorMessage}> 
                                    {errors.name.message} 
                                </span>
                            }

                        <input
                            placeholder="Nome de Usuário"
                            type="username"
                            {...register("username")}/>
                            {errors.username && 
                                <span
                                    className={style.errorMessage}>
                                    {errors.username.message}
                                </span>
                            }

                        <input
                            placeholder="E-mail"
                            type="email"
                            {...register("email")}/>
                            {errors.email &&
                                <span
                                    className={style.errorMessage}>
                                    {errors.email.message}
                                </span>
                            }

                        <input
                            placeholder="Senha"
                            type="password"
                            {...register("password")}/>
                            {errors.password &&
                                <span
                                    className={style.errorMessage}>
                                    {errors.password.message}
                                </span>
                            }

                        <input
                            placeholder="Confirmar Senha"
                            type="confirmPassword"
                            {...register("confirmPassword")}/>
                            {errors.confirmPassword &&
                                <span
                                    className={style.errorMessage}>
                                    {errors.confirmPassword.message}
                                </span>
                            }
                    </div>

                    <button
                        className={isSubmitting ? style.disabledRegisterButton : style.enabledRegisterButton}
                        disabled={isSubmitting}
                        onClick={() => settingUser(user!)}
                        type="submit">
                        {isSubmitting ? "♥ REGISTRADO ♥" : "REGISTRAR"}
                    </button>
                </form>
                
            </div>
        </div>
    )
}
