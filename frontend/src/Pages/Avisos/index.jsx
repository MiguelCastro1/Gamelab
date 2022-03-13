import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

function Avisos(){

    return (
        <>
        <HeaderHome />
        <div className={styles.container}>
            <h1> Avisos</h1>
        </div>
        </>
    );
}

export default Avisos;