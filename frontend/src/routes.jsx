import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import EnviarEmail from "./Pages/EnviarEmail";
import EscolherPerfil from "./Pages/EscolherPerfil";
import FormCadastro from "./Pages/FormCadastro";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Sobre from "./Pages/Sobre";
import Curso from "./Pages/Curso";
import Perfil from "./Pages/Perfil";
import NotFound from "./Pages/NotFound";
import ResetarSenha from "./Pages/ResetarSenha";
import Atividade from "./Pages/Atividade";

import { isAuthenticated } from "./services/auth";

const RotasPrivadas = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-perfil" element={<FormCadastro />} />
        <Route path="/email" element={<EnviarEmail />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/resetarsenha" element={<ResetarSenha />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<RotasPrivadas />}>
          <Route path="/curso/:courseId/:atividadeId" element={<Atividade />} />
          <Route path="/curso/:courseId" element={<Curso />} />
          <Route path="/perfil/:userId" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />''
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/kanban" element={<Home />} />
          <Route path="/avisos" element={<Home />} />
          <Route path="/procurar-curso" element={<Home />} />
          <Route path="/cadastrar-curso" element={<Home />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
