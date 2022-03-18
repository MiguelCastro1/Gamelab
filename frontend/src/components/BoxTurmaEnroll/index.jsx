import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaDoorOpen, FaGraduationCap} from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState,  } from "react";
import user_padrao from "../../assets/user_padrao.png"
import api from "../../services/axios";

function BoxTurmaEnroll({ course_id, nomeTurma, professor, descricao, senha_curso, ...props }) {
  const [senha,setSenha] = useState("")
  let navigate = useNavigate()
  const {id} = localStorage.getItem("gamelab")? JSON.parse(localStorage.getItem("gamelab")): null;

  const enroll =  () =>{
    if(senha_curso === undefined){
      console.log('in')
      try {
        api.post(`/cursos/${course_id}/matricula`, id)
        .then((data) => {
          console.log('done')
          navigate('/')
        })
        .catch(err => console.log(err))
      }catch (error) {
        console.log(error);
      }
    }else{
      console.log(senha)
      console.log(senha_curso)
      if(senha === senha_curso){
        console.log('in')
        try {
          api.post(`/cursos/${course_id}/matricula`,id)
          .then((data) => {
            console.log('done')
            navigate('/')
          })
          .catch(err => console.log(err))
        }catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
          <FaGraduationCap/>
          {/* <AiOutlineStar
            style={{ cursor: "pointer", color: "var(--blue-700)" }}
          /> */}
        </section>
        <section>
          <p>
            <span>professor:</span> <br/>{professor}
            <img src= {user_padrao} alt="Professor" />
                  
          </p>
          <p>
            <span>Descrição:</span> {descricao}
            <div className={styles.matricula} onClick={enroll}>
                Matricular-se <FaDoorOpen size={20} />
            </div>
            { senha_curso !== undefined && 
                <input
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                  placeholder="Insira Chave da Turma"
                />
            }
          </p>
        </section>
      </div>
    </div>
  );
}

export default BoxTurmaEnroll;
