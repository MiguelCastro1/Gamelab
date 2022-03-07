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
<<<<<<< HEAD
import { isAuthenticated } from "./services/auth";

const RotasPrivadas = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
=======
//import { isAuthenticated } from "./services/auth";

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
import HomeAluno from "./Pages/HomeAluno";
>>>>>>> 6e8b9e8b23edc3f39918767f1fef958330ad467a

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-perfil" element={<FormCadastro />} />
        <Route path="/email" element={<EmailEnviado />} />
<<<<<<< HEAD
        <Route element={<RotasPrivadas />}>
          <Route path="/" element={<HomeProfessor />} />
          <Route path="/detalhes" element={<DetalheTurma />} />
          <Route path="/home2" element={<HomeAluno />} />
        </Route>
=======
        <Route path="/" element={<DetalheTurma />} />
        <Route path="/home" element={<HomeProfessor />} />
        <Route path='*' element={<h1>Not Found</h1>} />
        <Route path="/home2" element={<HomeAluno />} />
>>>>>>> 6e8b9e8b23edc3f39918767f1fef958330ad467a
      </Routes>
    </BrowserRouter>
  );
}
