import { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import api from "../../services/axios";
import TextArea from "../../components/TextArea";
import { Button, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import imagePadrao from "../../assets/user_padrao.png";

const fields = [
  "nome",
  "email",
  "matricula",
  "instituicao",
  "dataNascimento",
  "cidade",
  "paisOrigem",
  "dataIngresso",
  "descricaoPerfil",
];

const formSchema = Yup.object().shape({
  nome: Yup.string().max(100, "Limite atingido").required("Campo obrigatório"),
  email: Yup.string().email("Email Invalido").required("Campo obrigatório"),
  dataNascimento: Yup.string().required("Campo obrigatório"),
  matricula: Yup.number("Matricula invalida").required("Campo obrigatório"),
  instituicao: Yup.string()
    .max(100, "Limite atingido")
    .required("Campo obrigatório"),
  cidade: Yup.string(),
  paisOrigem: Yup.string(),
  dataIngresso: Yup.string(),
  descricaoPerfil: Yup.string(),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
};

function Perfil() {
  let navigate = useNavigate();
  const [flagReset, setFlagReset] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [file, setFile] = useState([true]);
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [imgUser, setImgUser] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  let { id } = localStorage.getItem("gamelab")
    ? JSON.parse(localStorage.getItem("gamelab"))
    : null;

  useEffect(() => {
    async function fetchImage() {
      let {
        data: { image },
      } = await api.get(`/usuarios/avatar/${userId}`);
      setImgUser(`http://localhost:5000/public/avatar/${image}`);
      setProfileImage(`http://localhost:5000/public/avatar/${image}`);
    }
    fetchImage();
  }, []);

  const handleCancel = () => {
    setFlagReset(!flagReset);
    setIsEdit(!isEdit);
  };

  const handleSubmit = async (values) => {
    try {
      await api.patch(`usuarios/${userId}`, values);
      setIsEdit(true);
      toast.success("Campos editados com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  };

  const handleSubmitImage = async () => {
    try {
      let data = new FormData();
      data.append("file", updatedImage);
      await api.patch(`usuarios/avatar/${userId}`, data);
      toast.success("Imagem alterada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao alterar a imagem");
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setUpdatedImage(e.target.files[0]);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setProfileImage(imgUser);
    setOpen(false);
  };

  const removeProfileImage = () => {
    setProfileImage(imagePadrao);
    setUpdatedImage(imagePadrao);
  };

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <h1> Perfil</h1>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            matricula: "",
            instituicao: "",
            dataNascimento: "",
            cidade: "",
            paisOrigem: "",
            dataIngresso: "",
            descricaoPerfil: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {function ShowForm({ values, handleChange, setFieldValue }) {
            useEffect(() => {
              async function fetchItemsDetails() {
                const { data } = await api.get(`usuarios/${userId}`);
                fields.forEach((field) => {
                  setFieldValue(field, data.doc[field], false);
                });
              }
              fetchItemsDetails();
            }, [setFieldValue, flagReset]);

            return (
              <Form>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className={styles.modalContent}>
                      <header>
                        <h3>Alterar foto de perfil</h3>
                      </header>
                      <main>
                        <img src={profileImage} alt="imagem de usuário" />
                        <Stack direction="row" spacing={1}>
                          {!imgUser.includes("user_padrao.png") && (
                            <Button
                              variant="outlined"
                              onClick={removeProfileImage}
                            >
                              Remover
                            </Button>
                          )}
                          <label htmlFor="contained-button-file">
                            <input
                              accept="image/*"
                              id="contained-button-file"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => imageHandler(e)}
                            />
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </Stack>
                      </main>
                      <footer>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" onClick={handleClose}>
                            Cancelar
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSubmitImage}
                          >
                            Salvar
                          </Button>
                        </Stack>
                      </footer>
                    </div>
                  </Box>
                </Modal>
                <main className={styles.content}>
                  <header>
                    <div className={styles.icons} onClick={() => navigate(-1)}>
                      <FiArrowLeft size="1.6rem" />
                    </div>
                    {id === userId && (
                      <div
                        onClick={() => setIsEdit(!isEdit)}
                        className={styles.icons}
                      >
                        <FiEdit2 size="1.6rem" />
                      </div>
                    )}
                  </header>
                  <section>
                    <div className={styles.formContent}>
                      <div>
                        <img src={imgUser} alt="usuário" />
                        {!isEdit && (
                          <div className={styles.addImage} onClick={handleOpen}>
                            <BiImageAdd />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Input
                        label="Nome de usuário"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        type="text"
                        disabled={isEdit}
                        autoFocus={true}
                        estilo={{ marginBottom: "2.7rem" }}
                      />

                      <div className={styles.lineForm}>
                        <Input
                          label="Número de Matrícula"
                          name="matricula"
                          value={values.matricula}
                          type="text"
                          onChange={handleChange}
                          disabled={isEdit}
                        />
                        <Input
                          label="Data de nascimento"
                          name="dataNascimento"
                          value={values.dataNascimento}
                          type="date"
                          onChange={handleChange}
                          disabled={isEdit}
                          estilo={{ marginTop: "0" }}
                        />
                      </div>
                      <Input
                        label="Nome da instituição"
                        name="instituicao"
                        value={values.instituicao}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Endereço de E-mail"
                        name="email"
                        value={values.email}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Cidade"
                        name="cidade"
                        value={values.cidade}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="País de origem"
                        name="paisOrigem"
                        value={values.paisOrigem}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Data de ingresso"
                        name="dataIngresso"
                        value={values.dataIngresso}
                        type="date"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <TextArea
                        label="Descrição de perfil"
                        name="descricaoPerfil"
                        value={values.descricaoPerfil}
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                    </div>
                  </section>
                  <footer>
                    <button
                      style={{ opacity: !isEdit ? "1" : 0 }}
                      className={styles.cancelar}
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      style={{ opacity: !isEdit ? "1" : 0 }}
                      className={styles.salvar}
                      type="submit"
                    >
                      Salvar
                    </button>
                  </footer>
                </main>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default Perfil;
