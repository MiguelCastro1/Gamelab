import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";

function Sobre(){

    return (
        <>
        <HeaderAuth />
        <div className={styles.container}>
            <h1> Sobre Nós</h1>
        </div>
        </>
    );
}

export default Sobre;