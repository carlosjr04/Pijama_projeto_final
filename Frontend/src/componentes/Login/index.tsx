import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import style from "./style.module.css"
import { z } from "zod"
import { useState } from "react"
import axios from "axios"

interface UserSchema {
    userEmail: string;
    password: string;
}
interface IUser {
    userEmail: string,
    password: string,
}

const UserSchema = z.object({
    userEmail: z
        .string()
        .nonempty("• este campo não pode estar em branco")
        .refine(
            (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[^\s\u00C0-\u024F]+$/.test(value), {
            message: "• insira um email válido ou um nome de usuário sem acentos ou espaços."
        }),
    password: z
        .string()
        .min(6, "• a senha deve conter pelo menos 6 caracteres.")
})

type User = z.infer<typeof UserSchema>

export default function Login() {
    
    const [user, setUser] = useState<IUser>()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm<User>( {
        resolver: zodResolver(UserSchema)
    })

    async function resetFields() {
        await new Promise(resolve => setTimeout(resolve, 1000))
        reset()
        await new Promise(resolve => setTimeout(resolve, 500))
        navigate("/homepage")
    }

    function settingUser (data: IUser) {
        setUser(data)
        console.log(data)
        axios
            .post("http://localhost:3000/autheticate", data)
            .then(() => console.log("Logado com sucesso!!"))
            .catch((error) => console.log("Algo deu errado: " + error))
    }

    return (
        <div className={style.container}>
            <div className={style.mainDiv}>

                <section className={style.text}>
                    <h1 className={style.title}> Login </h1>
                    <p className={style.innerText}> Faça login para ter acesso aos pijamas dos seus <span className={style.innerSpan}>sonhos!</span></p>
                </section>

                <form onSubmit={handleSubmit(resetFields)} className={style.form}>
                    <input
                        className={style.userEmail}
                        placeholder="Usuário ou E-mail"
                        type="text"
                        {...register("userEmail")}/>
                        {errors.userEmail && 
                            <span
                                className={style.errorMessageUserEmail}> 
                                {errors.userEmail.message}
                            </span>
                        }

                    <input 
                        className={style.password}
                        placeholder="Senha"
                        type="password" 
                        {...register("password")}/>
                        {errors.password && 
                            <span className={style.errorMessagePassword}> 
                                {errors.password.message} 
                            </span>
                        }

                    <button 
                        className={style.retrieveButton}>
                        Esqueci minha senha</button>
                    
                    <button 
                        className={`${isSubmitting ? style.disabledEnterButton : style.enabledEnterButton}`}
                        type="submit"
                        onClick={() => settingUser(user!)}
                        disabled={isSubmitting}>
                        {isSubmitting ? "AGUARDE..." : "ENTRAR"}
                        </button>
                    <hr className={style.hr}/>

                </form>

                <button 
                    className={style.registerButton}
                    onClick={() => (navigate("/cadastro"))}>
                    CADASTRE-SE</button>

            </div>
        </div>
    )
}