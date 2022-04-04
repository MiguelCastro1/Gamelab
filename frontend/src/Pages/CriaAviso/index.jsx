import { useState } from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import { BsKanban, BsCalendarCheck} from "react-icons/bs";
import {FcHome} from "react-icons/fc";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { getToken } from "../../services/auth";



function Avisos() {

  let { id } = getToken() ? JSON.parse(getToken()) : null;
  const [curso, setCurso] = useState([]);
  const { courseId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const deletar =  () =>{
    try {
      api.delete(`/cursos/${courseId}`)
      .then((data) => {
        toast("O curso foi excluido com sucesso!");
        console.log('done');
        navigate('/');
      })
      .catch((err) =>  {
        toast.error("Algum Erro ocorreu") 
        console.log(err)
      })
    }catch (error) {
      toast.error("Algum Erro ocorreu") 
        console.log(err)
    }
  }

  /*/*useEffect(() => {
    
    try {
      api.get(`/cursos/${courseId}`)
      .then((data) => {
       // console.log(data.data.doc)
       //console.log(secoes)
        setCurso(data.data.doc);
        setLoaded(true);
        console.log('done')

       })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);
  */
  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li></li>
              <li>
                <Link to="/kanban">
                  {" "}
                  Meu Kanban <BsKanban size={20} />{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {" "}
                  Home
                  <FcHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

            <div className={styles.feed}>
                <h1> Avisos</h1>
            </div>



        </div>
      </div>
    </>
  );
}

export default Avisos;
