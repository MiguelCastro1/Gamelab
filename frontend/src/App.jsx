import PerfilProvider from "./Context/PerfilContext";
import Rotas from "./routes";
import "react-calendar/dist/Calendar.css";

function App() {
  localStorage.removeItem("gamelab")
  return (
    <>
      <PerfilProvider>
        <Rotas />
      </PerfilProvider>
    </>
  );
}

export default App;
