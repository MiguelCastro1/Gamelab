import { useState } from "react";
import { FaDoorOpen, FaGraduationCap } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import user_padrao from "../../assets/user_padrao.png";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { FcGraduationCap } from "react-icons/fc";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function BoxTurmaEnroll({
  course_id,
  nomeTurma,
  professor,
  descricao,
  senha_curso,
  ...props
}) {
  const [senha, setSenha] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enroll = () => {
    if (senha_curso === undefined && senha_curso !== "") {
      try {
        api
          .post(`/cursos/${course_id}/matricula`)
          .then((data) => {
            toast.success("Matriculado com sucesso!");
            console.log("done");
            navigate(`/curso/${course_id}`);
          })
          .catch((err) => {
            toast.error("Algum Erro ocorreu");
            console.log(err);
          });
      } catch (error) {
        toast.error("Algum Erro ocorreu");
        console.log(err);
      }
    } else {
      if (senha === senha_curso) {
        try {
          api
            .post(`/cursos/${course_id}/matricula`)
            .then((data) => {
              toast("Matriculado com sucesso!");
              console.log("done");
              navigate(`/curso/${course_id}`);
            })
            .catch((erro) => {
              toast.error("Algum Erro ocorreu");
              console.log(err);
            });
        } catch (err) {
          toast.error("Algum Erro ocorreu");
          console.log(err);
        }
      } else {
        toast.error("Senha inválida");
        console.log("senha inválida");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
          <FcGraduationCap size={25} />
        </section>
        <section>
          <p>
            <span>Professor: </span>
            {professor}
            <img src={user_padrao} alt="Professor" />
          </p>
          <p>
            <span>Descrição:</span> {descricao}
            <Button className={styles.matricula} onClick={handleClickOpen}>
              Matricular-se <FaDoorOpen size={20} />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                {"Você deseja realmente se matricular?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={enroll}>Confirmar</Button>
              </DialogActions>
            </Dialog>
            {senha_curso !== undefined && senha_curso !== "" && (
              <input
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                placeholder="Insira Chave"
              />
            )}
          </p>
        </section>
      </div>
    </div>
  );
}

export default BoxTurmaEnroll;
