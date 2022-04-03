import { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import {SiGoogleclassroom} from "react-icons/si"
import api from "../../services/axios";
import { toast } from 'react-toastify';
import {FcLink} from "react-icons/fc";
import {FcInspection} from "react-icons/fc";
import {FcFile} from "react-icons/fc";

function Secoes({secoes, nomeCurso, ...props }) {
  const navigate = useNavigate()

  const acao = (conteudo) => {
    if(conteudo.tipo === 'pdf'){
      console.log(conteudo.tipo)
    }else if(conteudo.tipo === 'link'){
      console.log(conteudo.tipo)
    }else if(conteudo.tipo === 'atividade'){
      console.log(conteudo.tipo)
    }
  }
  
  return (

    <div className={styles.container}>
      <h1>  <SiGoogleclassroom size={25}/> {nomeCurso}  </h1> 
      {secoes.map((secao) => (
      <div className={styles.secao}>
        <h2>{secao.titulo}</h2>
        <div className={styles.conteudo}>
          {secao.conteudos.map((conteudo) => (
            <div className={styles.conteudoInfo} >
              {conteudo.tipo == 'pdf' ?   
                <FcFile size={25} /> :
              conteudo.tipo == 'link' ?
                <FcLink size={25}/> :
                <FcInspection size={25}/>              
              }
              <h3 >{conteudo.titulo }</h3>
            </div>
          ))}
        </div>
      </div>
      ))}
    </div>
  );
}

export default Secoes;
