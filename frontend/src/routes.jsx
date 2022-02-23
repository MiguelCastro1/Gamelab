import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmailEnviado from "./Pages/EmailEnviado";
import EscolherPerfil from "./Pages/EscolherPerfil";
import Form from "./Pages/Form";
import HomeProfessor from "./Pages/HomeProfessor";
import Login from "./Pages/Login";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<EscolherPerfil />} />
        <Route path="/cadastrar-form" element={<Form />} />
        <Route path="/email" element={<EmailEnviado />} />
        <Route path="/" element={<HomeProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}
