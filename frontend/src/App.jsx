import PerfilProvider from "./Context/PerfilContext";
import Rotas from "./routes";

function App() {
  return (
    <>
      <PerfilProvider>
        <Rotas />
      </PerfilProvider>
    </>
  );
}

export default App;
