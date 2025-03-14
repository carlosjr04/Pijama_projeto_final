import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/lobo_header.png";
import compras from "../../assets/Compras.png";
import favorito from "../../assets/Favorito.png";
import user from "../../assets/User.png";
import style from "./style.module.css";
import { useState } from "react";

export default function Header() {

    const navigate = useNavigate();
    const {login} = useParams()
    const [isLogin, setIsLogin] = useState("false")

    if(login === "login") { setIsLogin("true") }
    console.log(isLogin)

    function navigation (pathing: string) {
        switch (pathing) {
            case "carrinho": navigate("/carrinho"); break
            case "favorito": navigate("/favorito"); break
            case "login": navigate("/login"); break
            case "home": navigate("/homepage"); break
        }
    }

    return (
        <div className={style.header}>
            
            {login === "login" ? (
                <img className={style.logo} onClick={() => (navigation("home"))} src={logo} alt="Logo" />
            ) : (
                <img className={style.logo} src={logo} alt="Logo" />
            )}
            
            <nav className={style.links}>
                <Link to={"/pijamas"}>PIJAMAS</Link>
                <Link to={`/pijamas/${"feminino"}`}>FEMININO</Link>
                <Link to={`/pijamas/${"masculino"}`}>MASCULINO</Link>
                <Link to={`/pijamas/${"infantil"}`}>INFANTIL</Link>
            </nav>
            <div className={style.perfil}>
                <div>
                    <img onClick={() => (navigation("carrinho"))} src={compras} alt="Compras" />
                    <img onClick={() => (navigation("favorito"))} src={favorito} alt="Favorito" />
                </div>
                <img onClick={() => (navigation("login"))} src={user} alt="Avatar de Usuário" />
            </div>
        </div>
    )
}