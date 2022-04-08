import { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { FcLink } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import nada from "../../assets/passado.webp";
import { FiEdit2 } from "react-icons/fi";

function Secoes({ secoes, nomeCurso, courseId, ...props }) {
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState(true);
  const [open, setOpen] = useState(false);

  const acao = (conteudo) => {
    if (conteudo.tipo === "pdf") {
      window.open(conteudo.uri);
    } else if (conteudo.tipo === "link") {
      window.open(conteudo.uri);
    } else {
      console.log("inin");
      navigate(`/curso/${courseId}/${conteudo._id}  `);
    }
  };

  const handleParcial = (id) => {
    console.log(secoes[id]);
  };

  return (
    <div className={styles.container}>
      <h1>
        {" "}
        <SiGoogleclassroom size={25} /> {nomeCurso}{" "}
      </h1>
      {secoes.length === 0 && <h3> Nenhum Conteudo </h3>}
      {secoes.length === 0 && <img src={nada} width={500} height={500} />}

      {secoes.map((secao, index) => (
        <div className={styles.secao}>
          <h2>{secao.titulo}</h2>
          {isEdit && (
            <div
              className={styles.iconEdit}
              onClick={() => handleParcial(index)}
            >
              <FiEdit2 />
            </div>
          )}
          <div className={styles.conteudo}>
            {secao.conteudos.map((conteudo) => (
              <div
                className={styles.conteudoInfo}
                onClick={() => acao(conteudo)}
              >
                {conteudo.tipo == "pdf" ? (
                  <FcFile size={25} />
                ) : conteudo.tipo == "link" ? (
                  <FcLink size={25} />
                ) : (
                  <FcInspection size={25} />
                )}
                <h3>{conteudo.titulo}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Secoes;
