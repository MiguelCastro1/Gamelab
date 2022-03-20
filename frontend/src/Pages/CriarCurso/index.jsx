import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch} from "react-icons/bi";
import { BsChevronCompactLeft, BsKanban, BsFilter, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import {FaDoorOpen} from "react-icons/fa"
import HeaderHome from "../../components/HeaderHome";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";



function CriarCurso() {
  const [habilitado, setHabilitado] = useState(-1);

  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");


  let {id} = localStorage.getItem("gamelab")
    ? JSON.parse(localStorage.getItem("gamelab"))
    : null;
    const [erro, setErro] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      console.log("in");
      let {
        data: {
          course: {nomeCurso,materia ,descricao,senha,codigo,autorId,autorEmail},
        },
      } = await api.post("/criar-curso", values);
      let dados = {
        nomeCurso,
        materia,
        codigo,
        descricao,
        senha,
        autorEmail: email,
        autorId: id,
      };
      localStorage.setItem("gamelab", JSON.stringify(dados));
      navigate("/");
    } catch (error) {
      setErro(true);
      console.log(error);
    }
  };
  
  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li></li>
              <li>
                <Link to="/kanban">
                  {" "}
                  Meu Kanban <BsKanban size={20} />{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {" "}
                  Home
                  <FiHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.feed}>
            <header>
              <h1 className="C">Criar Turma</h1>
            </header>
                <Formik initialValues={{
                nomeCurso: "",
                materia: "",
                descricao: "",
                senha: "",
              }}
              onSubmit={handleSubmit}
              >
              {({handleSubmit, ...props})=>
              <Form>
                <Input 
                name="nomeCurso"
                label={"Nome do curso"}
                type="text"
                placeholder=""
                />
                <Input
                name="materia"
                label={"Materia"}
                type="text"
                placeholder=""
                />    
                 <Input
                name="descricao"
                label={"Descrição"}
                type="text"
                placeholder=""
                />  
                 <Input
                name="codigo"
                label={"Codigo da turma"}
                type="text"
                placeholder=""
                />  
              <p className={styles.senha_h}>Habilitar senha <input id="toggle" className={styles.toggle} type="checkbox" onClick={() => setHabilitado(habilitado * -1)}></input>
              <label htmlFor="toggle"></label></p> 
              {habilitado === 1 &&(
                <div className={styles.campo_senha}> 
                <Input name="senha" label={"Inserir senha"} type="text" placeholder=""/>
                <Input name="confirmar_senha" label={"Confirmar senha"} type="text" placeholder=""/>
                </div>
              )}
              <button type="submit">Criar Curso</button>
              </Form>
              
              
              }

              </Formik>
            <div>

    
            </div>
            {}
          </div>


          <div className={styles.sideBarRight}>
            <ul>
               
              <li className={styles.avisos}>
                <h3>Calendário</h3>
                <Calendar
                  className={styles.reactCalendar}
                  onChange={setDate}
                  value={date}
                />
              </li>
                
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarCurso;
