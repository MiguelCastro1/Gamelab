import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

function Kanban(){
    return (
        <>
        <HeaderHome />
        <div className={styles.container}>
            <h1> Kanban</h1>
        </div>
        </>
    );
};

export default Kanban;