import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsKanban, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";
import BoxTurma from "../../components/BoxTurma";
import monster from "../../assets/guerreiro-morto.gif";
import ghost from "../../assets/ghost.gif";

function Participantes() {
  const atividade = {
    nome: "Matematica Lógica",
    dataFim: "15/04/22 as 21:00",
    imagem: monster,
  }

  const atividade2 = {
    nome: "Programação Lógica",
    dataFim: "15/04/22 as 21:00",
    imagem: monster,
  }

  let { id, perfil } = getToken() ? JSON.parse(getToken()) : null;
  const [curso, setCurso] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    
    try {
      api.get(`/cursos/${courseId}`)
      .then((data) => {
       // console.log(data.data.doc)
        setCurso(data.data.doc);
        console.log('done')

       })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);

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
                  <FiHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

            <div className={styles.feed}>
                <h1> {curso.nomeCurso} </h1>
            </div>

            <div className={styles.sideBarRight}>
            <div className={styles.formating} >
              <div className={styles.dados}> 
                <h3> Dados da turma </h3>
                <p> Professor : {curso.autorEmail} </p>
                <p> Descrição: {curso.descricao}  </p> 
                <p> Status: {curso.Ativo}  </p> 
              </div> 

              <div className={styles.botoes} >
                <ul>
                  <li></li>
                  <li>
                    <Link to="/kanban">
                      {" "}
                      Ver Participantes <BsKanban size={20} />{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {" "}
                      Ver Notas
                      <FiHome size={20} />{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {" "}
                      Desinscrever-se
                      <FiHome size={20} />{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={styles.atividades} >
                <h3> Atividades </h3>
                <div className={styles.tarefa}>
                  <p> {atividade.nome} </p>
                  <p> Entrega : {atividade.dataFim}  </p> 
                  <button >Mais Detalhes</button>
                  <img
                      src={monster}
                      alt="Monstro"  
                      width={115}
                      height={115}
                    />
                    
                </div>
                <div className={styles.tarefa}>
                  <p> {atividade2.nome} </p>
                  <p> Entrega: {atividade2.dataFim}  </p> 
                  <button >Mais Detalhes</button>
                  <img
                      src={ghost}
                      alt="Monstro"  
                      width={115}
                      height={115}
                    />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Participantes;
