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
          O GameLab é uma plataforma simples de apoio à aprendizagem, que
          auxilia no gerenciamento de conteúdo para professores e alunos que
          procuram simplificar a criação, a distribuição, envio e a avaliação de
          trabalhos.
        </p>
        <p>
          O diferencial do sistema é a adição de elementos gráficos e de
          gamificação cujo objetivo é aumentar o engajamento dos alunos nos
          cursos matriculados. Além disso, o GameLab também implementa no seu
          sistema a funcionalidade do Kanban, com intuito de auxiliar no
          gerenciamento de atividades tanto para os professores quanto para os
          alunos.
        </p>
        <p>
          O GameLab tem como filosofia ser uma plataforma intuitiva e atrativa
          para qualquer tipo de usuário. Com seu design baseado em SPA, o
          GameLab espera ser uma opção viável às ferramentas já existentes como
          o Moodle e google Classroom.
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
              <small>Natália Freire</small>
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
