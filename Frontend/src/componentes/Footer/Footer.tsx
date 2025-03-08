import styles from "./style.module.css";
import logo from "../../assets/logo_footer.png";
import facebook from "../../assets/ri_facebook-fill.png"
import instagram from "../../assets/mdi_instagram.png"
import linkedin from "../../assets/ri_linkedin-fill.png"

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.informacoes}>
          <div className={styles.texto}>
            <div className={styles.endereco}>
                <h2>Endereço</h2>
                <p>Av. Milton Tavares de Souza,
                s/n - Sala 115 B - Boa Viagem, 
                Niterói - RJ
                CEP: 24210-315 </p>
                
            </div>
            <div className={styles.faleConosco}>
                <h2>Fale conosco</h2>
                <p>contato@injunior.com.br</p>
            </div>
            <div className={styles.redesSociais}>
                <img src={instagram} alt="" />
                <img src={facebook} alt="" />
                <img src={linkedin} alt="" />
            </div>
          </div>
          <img src={logo} alt="" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.190302842863!2d-43.135966625514286!3d-22.90635063785382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817ed79f10f3%3A0xb39c7c0639fbc9e8!2sIN%20Junior%20-%20Empresa%20Junior%20de%20Computa%C3%A7%C3%A3o%20da%20UFF!5e0!3m2!1sen!2sbr!4v1741464090907!5m2!1sen!2sbr"
            width="325px"
            height="244px"
            style={{ border: 0, boxShadow: "8px 8px 16px 0px #00000040" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={styles.copyrigth}>
            <p>© Copyright 2025. IN Junior. Todos os direitos reservados. Niterói, Brasil.</p>
        </div>
      </div>
    </>
  );
}
