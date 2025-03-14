import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import style from "./style.module.css"
import { z } from "zod"

// "• digite um email válido"
// "• o usuário não pode conter espaços ou acentos"

interface UserSchema {
    userEmail: string;
    password: string;
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

    

    return (
        <div className={style.container}>
            <div className={style.mainDiv}>

                <section className={style.text}>
                    <h1 >Login</h1>
                    <p >Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
                </section>

                <form onSubmit={handleSubmit(resetFields)}>
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
                        disabled={isSubmitting}>
                        {isSubmitting ? "AGUARDE..." : "ENTRAR"}
                        </button>
                    <hr />

                </form>

                <button 
                    className={style.registerButton}
                    onClick={() => (navigate("/cadastro"))}>
                    CADASTRE-SE</button>

            </div>
        </div>
    )
}