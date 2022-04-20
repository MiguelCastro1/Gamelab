import { Link,useNavigate, useParams } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png";
import styles from "./styles.module.scss";
import {FcConferenceCall} from 'react-icons/fc'
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { setNestedObjectValues } from "formik";
import { getToken } from "../../services/auth";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import {FcVoicePresentation} from "react-icons/fc";
import TextField from '@mui/material/TextField';
import { margin } from "@mui/system";



function Avisos() {
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
        <div className={styles.barra}>
          <TextField className={styles.search} id="outlined-basic" label="Filtrar aviso por turma" variant="outlined" onChange={(e) => setSearchCurso(e.target.value) }
            value={searchCurso} />
        </div>
       <div>
        { loaded && searchCurso === '' ? (
            resultados.map((aviso) => (
              <div className={styles.container}>
                <section>
                  <h3>{aviso.titulo}</h3>
                  <FcVoicePresentation size={40}/>
                </section>
                <section>
                  <p>
                    <span>Turma:</span> {aviso.courseId ? aviso.courseId.nomeCurso: ''} 
                    
                  </p><span>Data: {new Date(Date.parse(aviso.createdAt)).toLocaleDateString()}</span>
                </section>
                <p className={styles.descricao}>
                    <span>Conteudo: </span> {aviso.conteudo}
                  </p>
            </div>
            )))
            :
            (searchResults.map((aviso) => (
              <div className={styles.container}>
              <section>
                <h3>{aviso.titulo}</h3>
                <FcVoicePresentation size={40}/>
              </section>
              <section>
                <p>
                  <span>Turma:</span> {aviso.courseId ? aviso.courseId.nomeCurso: ''} 
                  
                </p><span>Data: {new Date(Date.parse(aviso.createdAt)).toLocaleDateString()}</span>
              </section>
              <p className={styles.descricao}>
                  <span>Conteudo: </span> {aviso.conteudo}
                </p>
          </div>
               
            )))
          }
          
          
        </div>



      </div>      
  );
}

export default Avisos;
