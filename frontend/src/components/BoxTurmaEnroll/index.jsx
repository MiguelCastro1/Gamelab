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
  const enroll =  () =>{
    if(senha_curso === undefined){
      try {
        api.post(`/cursos/${course_id}/matricula`)
        .then((data) => {
          console.log('done')
          navigate('/')
        })
        .catch(err => console.log(err))
      }catch (error) {
        console.log(error);
      }
    }else{
      if(senha === senha_curso){
        try {
          api.post(`/cursos/${course_id}/matricula`)
          .then((data) => {
            console.log('done')
            navigate('/')
          })
          .catch(err => console.log(err))
        }catch (error) {
          console.log(error);
        }
      }else{
        console.log("senha invalida")
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
          <FaGraduationCap/>
        </section>
        <section>
          <p>
            <span>Professor:</span> {professor}
            <img src= {user_padrao} alt="Professor" />
          </p>
          <p>
            <span>Descrição:</span> {descricao}
            <div className={styles.matricula} onClick={enroll}>
                Matricular-se <FaDoorOpen size={20} />
            </div>
            {senha_curso !== undefined && 
              <input
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                placeholder="Insira Chave"
              />
            }
          </p>
        </section>
      </div>
    </div>
  );
}

export default BoxTurmaEnroll;
