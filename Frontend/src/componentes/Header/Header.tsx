import { Link } from "react-router-dom";
import logo from "../../assets/lobo_header.png"
import compras from "../../assets/Compras.png"
import favorito from "../../assets/Favorito.png"
import user from "../../assets/User.png"
import style from "./style.module.css"

export default function Header() {
  return (
    <>
      <div className = {style.header}>
        <img className = {style.logo} src={logo} alt="" />
        <div className = {style.links}>
            <Link to={""}>PIJAMAS</Link>
            <Link to={""}>FEMININO</Link>
            <Link to={""}>MASCULINO</Link>
            <Link to={""}>INFANTIL</Link>
        </div>
        <div className = {style.perfil}>
            <div>
                <img src={compras} alt="" />
                <img src={favorito} alt="" />
            </div>
            <img src={user} alt="" />
        </div>
      </div>
    </>
  );
}
