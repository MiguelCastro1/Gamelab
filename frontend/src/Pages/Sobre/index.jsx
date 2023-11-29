import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import rodrigo from "../../assets/creators/rodrigo.jpeg";
import pedro from "../../assets/creators/pedro.jpeg";
import miguel from "../../assets/creators/miguel.jpeg";
import natalia from "../../assets/creators/natalia.jpeg";

function Sobre() {
  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>
          Bem-vindo ao GameLab, sua plataforma intuitiva e atrativa para transformar a educação. Aqui, professores e alunos descobrem uma forma simplificada e engajante de criar, compartilhar e avaliar conteúdos educacionais.
        </p>
        <p>
          Combinamos elementos gráficos e de gamificação para elevar o envolvimento dos alunos, tornando o aprendizado mais dinâmico e divertido. Além disso, a integração da metodologia Kanban ajuda na organização e no gerenciamento eficaz das atividades, tanto para educadores quanto para estudantes.
        </p>
        <p>
          No GameLab, cada detalhe é pensado para garantir uma experiência de usuário fluída e eficiente, seja você professor ou aluno. Nosso design SPA (Single Page Application) assegura uma navegação rápida e responsiva, adequada para a educação moderna.
        </p>

        <footer>
          <p>Criadores</p>
          <ul>
            <li>
              <img src={miguel} alt="miguel" />
              <small>Miguel Castro</small>
            </li>
            <li>
              <img src={natalia} alt="natalia" />
              <small>Natalia Freire</small>
            </li>
            <li>
              <img src={pedro} alt="pedro" />
              <small>Pedro Paulo</small>
            </li>
            <li>
              <img src={rodrigo} alt="rodrigo" />
              <small>Rodrigo Taveira</small>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Sobre;
