import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/lobo_header.png";
import compras from "../../assets/Compras.png";
import favorito from "../../assets/Favorito.png";
import user from "../../assets/User.png";
import style from "./style.module.css";

export default function Header() {
  const navigate = useNavigate();

  function navigateFavorito() {
    navigate("/favorito");
  }

  function navigateCarrinho() {
    navigate("/carrinho");
  }
  function navigateHome() {
    navigate("/homepage");
  }

  return (
    <>
      <div className={style.header}>
        <img className={style.logo} onClick={navigateHome} src={logo} alt="" />
        <div className={style.links}>
          <Link to={"/pijamas"}>PIJAMAS</Link>
          <Link to={`/pijamas/${"feminino"}`}>FEMININO</Link>
          <Link to={`/pijamas/${"masculino"}`}>MASCULINO</Link>
          <Link to={`/pijamas/${"infantil"}`}>INFANTIL</Link>
        </div>
        <div className={style.perfil}>
          <div>
            <img onClick={navigateCarrinho} src={compras} alt="" />
            <img onClick={navigateFavorito} src={favorito} alt="" />
          </div>
          <img src={user} alt="" />
        </div>
      </div>
    </>
  );
}
