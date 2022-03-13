import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

function CriarCurso(){
    return (
        <>
        <HeaderHome />
        <div className={styles.container}>
            <h1> Criar Curso</h1>
        </div>
        </>
    );
};

export default CriarCurso;