import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

function Perfil(){
    return (
        <>
        <HeaderHome />
        <div className={styles.container}>
            <h1> Perfil</h1>
        </div>
        </>
    );
};

export default Perfil;