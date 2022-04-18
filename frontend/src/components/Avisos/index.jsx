import { Link,useNavigate, useParams } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png";
import styles from "./styles.module.scss";
import {FcConferenceCall} from 'react-icons/fc'
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { setNestedObjectValues } from "formik";
import { getToken } from "../../services/auth";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";



function Avisos({ Alunos, ...props }) {
  const [searchCurso, setSearchCurso] = useState("");
  const [resultados, setResultados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  let { id } = getToken() ? JSON.parse(getToken()) : null;
  const { userId } = useParams();
  const [loaded, setLoaded] = useState(false);

  const [titulo, setTitulo] = useState("Resultados: Ativos")

  useEffect(() => {
    try {
      api.get(`/avisos/${id}`)
      .then((data) => {
        setResultados(data.data.document);
        setLoaded(true);
        console.log(data.data.document)
        console.log('done')

      })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setSearchResults(
      resultados.filter((aviso) =>
        aviso.courseId &&
        aviso.courseId.nomeCurso.toLowerCase().includes(searchCurso.toLowerCase())
      )
    );
  }, [searchCurso]);
 
  

  
  return (

      <div className={styles.feed}>
        <h1>Avisos</h1>
        <input
          onChange={(e) => setSearchCurso(e.target.value)}
          value={searchCurso}
          placeholder="Nome da turma"
        />
       <div>
          <h2 className={styles.titulo}>  {titulo} </h2>
          { loaded && searchCurso === '' ? (
            resultados.map((aviso) => (
              <div key={aviso._id}>
                <h1>{aviso.titulo}</h1>
                <h2>Turma: {aviso.courseId ? aviso.courseId.nomeCurso: ''} 
                </h2>
                <p>Conteudo: {aviso.conteudo}</p>

              </div>
            )))
            :
            (searchResults.map((aviso) => (
              <div key={aviso._id}>
                <h1>{aviso.titulo}</h1>
                <h2>Turma: {aviso.courseId ? aviso.courseId.nomeCurso: ''} </h2>

              </div>
               
            )))
          }
        </div>



      </div>      
  );
}

export default Avisos;
