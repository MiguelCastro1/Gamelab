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
import Sobre from "./Pages/Sobre";
import Curso from "./Pages/Curso";
import Perfil from "./Pages/Perfil";
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
          <Route path="/curso/:courseId" element={<Curso />} />
          <Route path="/perfil/:userId" element={<Perfil />} />
          <Route path="/:url" element={<Home />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
