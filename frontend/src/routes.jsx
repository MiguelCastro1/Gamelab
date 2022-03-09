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
import HomeProfessor from "./Pages/HomeProfessor";
import HomeAluno from "./Pages/HomeAluno";
import Login from "./Pages/Login";
import DetalheTurma from "./Pages/DetalheTurma";

import { isAuthenticated } from "./services/auth";

const RotasPrivadas = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <navigateTo to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-perfil" element={<FormCadastro />} />
        <Route path="/email" element={<EmailEnviado />} />
        <Route path='*' element={<h1>Not Found</h1>} />

        <Route element={<RotasPrivadas />}>
          <Route path="/" element={<HomeProfessor />} />
          <Route path="/detalhes" element={<DetalheTurma />} />
          <Route path="/home2" element={<HomeAluno />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
