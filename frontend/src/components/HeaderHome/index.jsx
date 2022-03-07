import styles from "./styles.module.scss";
import imgUser from "../../assets/foto_prof.svg";
import {BiLogOut} from "react-icons/bi";

function HeaderHome() {

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>GameLab</h1>
        <div className={styles.areaUser}>
        <a href="#"> Matheus Matos  </a> 
        <img src={imgUser} alt="usuário" />
        <button className={styles.b_perfil}value='Meu_perfil'>Meu perfil</button>
        <button className={styles.b_sair} value='sair'>Sair</button>
        
        
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
