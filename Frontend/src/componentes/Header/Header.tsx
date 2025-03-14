import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/lobo_header.png";
import compras from "../../assets/Compras.png";
import favorito from "../../assets/Favorito.png";
import user from "../../assets/User.png";
import style from "./style.module.css";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation()
    const isLoginPage = (location.pathname === "/login") ? true : false

    function navigation (pathing: string) {
        switch (pathing) {
            case "carrinho": navigate("/carrinho"); break
            case "favorito": navigate("/favorito"); break
            case "login": navigate("/login"); break
            case "home": if(!isLoginPage) navigate("/homepage"); break
        }
    }

    return (
        <div className={style.header}>
            
            <img 
                src={logo} alt="Logo"
                className={`${isLoginPage ? style.logoLoginPage : style.logoNotLoginPage}`} 
                onClick={() => navigation("home")} />

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