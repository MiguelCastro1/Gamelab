import { Routes, Route, BrowserRouter , useNavigate} from "react-router-dom";
import React, { Component } from 'react';
import EmailEnviado from "./Pages/EmailEnviado";
import EscolherPerfil from "./Pages/EscolherPerfil";
import FormCadastro from "./Pages/FormCadastro";
import HomeProfessor from "./Pages/HomeProfessor";
import Login from "./Pages/Login";
import DetalheTurma from "./Pages/DetalheTurma";
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

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-perfil" element={<FormCadastro />} />
        <Route path="/email" element={<EmailEnviado />} />
        <Route path="/" element={<DetalheTurma />} />
        <Route path="/home" element={<HomeProfessor />} />
        <Route path='*' element={<h1>Not Found</h1>} />
        <Route path="/home2" element={<HomeAluno />} />
      </Routes>
    </BrowserRouter>
  );
}
