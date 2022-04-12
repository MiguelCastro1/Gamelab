import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import {getToken} from "../../services/auth";
import monster from "../../assets/guerreiro-morto.gif";
import ghost from "../../assets/ghost.gif";
import {AiFillPlusSquare} from "react-icons/ai";
import { BsKanban} from "react-icons/bs";
import {VscBellDot} from 'react-icons/vsc'
import EditarConteudoCurso from "../../components/EditarConteudoCurso";
import {FcHome, FcAreaChart, FcConferenceCall, FcDislike, FcApproval, FcSupport, FcEditImage, FcAdvertising, FcLeft } from "react-icons/fc";
import {toast} from 'react-toastify';
import {Button, Dialog, DialogActions, DialogTitle} from '@mui/material';
import ShowMoreText from "react-show-more-text";
import orc_gordo from "../../assets/orc_gordo.gif";

function EditarCurso() {
  const monstros = [monster, ghost, orc_gordo];
  const [curso, setCurso] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const {courseId} = useParams();
  let { perfil } = getToken() ? JSON.parse(getToken()) : null;
  const navigate = useNavigate()

  useEffect(() =>  {
    const f = () => {
      try {
        api.get(`/cursos/${courseId}`)
        .then((data) => {
          setCurso(data.data.doc);
          setLoaded(true)
          console.log('done')
        })
        .catch(err => console.log(err))
      }catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

  
  useEffect(() =>  {
    console.log("efect")
    const f = () => {
      if(Object.keys(curso).length > 0 && curso.secoes.length > 0) {
        let inter = curso.secoes.map((secao => (secao.conteudos.filter(conteudo => conteudo.tipo=== 'Atividade')))).filter(atividade => atividade.length > 0);
        if(inter.length > 0)
        setAtividades(inter[0])
      }
    }
    f();
  }, [curso]);

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
          <ul>
             <Button  onClick={() => navigate('/home')} variant="outlined" startIcon={<FcHome /> }>
                  Home
              </Button>
              {false && (
              <Button
                onClick={() => navigate("/kanban")}
                variant="outlined"
                startIcon={<BsKanban />}
              >
                Meu Kanban
              </Button>
              )}
              {false && perfil === "aluno" && (
                <Button
                  onClick={() => navigate("/avisos")}
                  variant="outlined"
                  startIcon={<VscBellDot />}
                >
                  Avisos
                </Button>
              )}
            </ul>
          </div>
          
          <div className={styles.feed}>
          {console.log({curso})}
              {loaded && <EditarConteudoCurso 
                _secoes={curso.secoes}
                nomeCurso={curso.nomeCurso}
                courseId={courseId}
                />
              }
           </div>
              
            <div className={styles.sideBarRight}>
            <div className={styles.formating} >
              <div className={styles.dados}> 
                <h3> Dados da turma </h3>
                <p><span className={styles.tit}> Professor: </span> {loaded ? curso.autorId.nome : ''} </p>
                <p><span className={styles.tit}> Descrição: </span> 
                  <ShowMoreText
                    lines={2}
                    more="Ver mais"
                    less="Ver menos"z
                    className="content-css"
                    width={400}
                  >
                  {loaded ? curso.descricao : '' } 
                  </ShowMoreText>
                </p> 
                <p><span className={styles.tit}> Status: </span> {loaded ? 'Ativo' : ''} < FcApproval size={20}/> </p> 
              </div> 
              <div className={styles.botoes}>
                <Button onClick={() => navigate(`/curso/${courseId}`)} variant="outlined" startIcon={<FcLeft />}>
                Voltar para curso
                </Button>
             </div>
      
               <div className={styles.atividades}>
                <h3> Atividades </h3>
                {console.log({atividades})}
                {atividades.map((atividade) => (
                  <div key = {atividade.titulo} className={styles.tarefa}>
                  <p style={{fontWeight: 'bolder'}}> {atividade.titulo} </p>
                    <p> Entrega : {'-'}  </p> 
                    <Button onClick={() => navigate(`/curso/${courseId}/${atividade._id}`)}  variant="outlined" startIcon={<AiFillPlusSquare />} >
                     Mais Detalhes
                     </Button>
                    {perfil === 'aluno' && ( 
                      <img
                        src={monstros[0]}   
                        alt="Monstro"  
                        width={115}
                        height={115}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarCurso;
