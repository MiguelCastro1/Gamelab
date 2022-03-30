import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import EmailEnviado from "./Pages/EmailEnviado";
import EscolherPerfil from "./Pages/EscolherPerfil";
import FormCadastro from "./Pages/FormCadastro";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import DetalheTurma from "./Pages/DetalheTurma";
import Sobre from "./Pages/Sobre";
import CriarCurso from "./Pages/CriarCurso";
import Kanban from "./Pages/Kanban";
import Avisos from "./Pages/Avisos";
import Curso from "./Pages/Curso";
import Perfil from "./Pages/Perfil";
import Procurar from "./Pages/Procurar";
import Participantes from "./Pages/Participantes";
import Atividade from "./Pages/Atividade";
import NotFound from "./Pages/NotFound";

import { isAuthenticated } from "./services/auth";

const RotasPrivadas = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-perfil" element={<FormCadastro />} />
        <Route path="/email" element={<EmailEnviado />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound/>} />

        <Route element={<RotasPrivadas />}>
          <Route path="/" element={<Home />} />
          <Route path="/notas-curso/:courseId" element={<DetalheTurma />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/criar-curso" element={<CriarCurso />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/curso/:courseId" element={<Curso />} />
          <Route path="/perfil/:userId" element={<Perfil />} />
          <Route path="/procurar-curso" element={<Procurar />} />
          <Route path="/curso/:courseId/:titulo" element={<Atividade />} />
          <Route path="/participantes/:courseId" element={<Participantes />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
