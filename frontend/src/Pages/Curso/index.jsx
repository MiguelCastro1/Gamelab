import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

function Curso(){
    return (
        <>
        <HeaderHome />
        <div className={styles.container}>
            <h1> Curso</h1>
        </div>
        </>
    );
};

export default Curso;