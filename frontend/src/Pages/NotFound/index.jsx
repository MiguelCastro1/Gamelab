import styles from './styles.module.scss';
import {Link, useNavigate} from "react-router-dom";


function NotFound(){
    const navigate = useNavigate()
    return (
    <>
    <div className={styles.container}>
    <div class={styles.face}>
	    <div className={styles.band}>
		<div className={styles.red}></div>
		<div className={styles.white}></div>
		<div className={styles.blue}></div>
	</div>
	    <div className={styles.eyes}></div>
	    <div className={styles.dimples}></div>
	    <div className={styles.mouth}></div>
    </div>

    <h1>Oops! Página não encontrada!</h1>
    <Link className={styles.btn} to='/home'> Home </Link>
        
    </div>
        
    </>


    )

} 
export default NotFound;