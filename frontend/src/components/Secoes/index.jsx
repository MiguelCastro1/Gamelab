
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { FcLink } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import nada from "../../assets/passado.webp";

function Secoes({ secoes, nomeCurso, courseId, ...props }) {
  const navigate = useNavigate();


  const acao = (conteudo) => {
    if (conteudo.tipo === "arquivo") {
      window.open(conteudo.uri);
    } else if (conteudo.tipo === "link") {
      window.open(conteudo.uri);
    } else {
      navigate(`/curso/${courseId}/${conteudo._id}  `);
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        {" "}
        <SiGoogleclassroom size={25} /> {nomeCurso}{" "}
      </h1>
      {secoes.length === 0 && <span> Nenhum Conteudo </span>}
      {secoes.length === 0 && <img src={nada} width={500} height={500} />}
      {secoes.map((secao) => (
        <div className={styles.secao}>
          <h2>{secao.titulo}</h2>
          <div className={styles.conteudo}>
            {secao.conteudos.map((conteudo) => (
              <div
                className={styles.conteudoInfo}
                onClick={() => acao(conteudo)}
              >
                {conteudo.tipo == "arquivo" ? (
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
