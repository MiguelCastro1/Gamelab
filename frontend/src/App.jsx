import PerfilProvider from "./Context/PerfilContext";
import Rotas from "./routes";
import { ToastContainer} from 'react-toastify';
import "react-calendar/dist/Calendar.css";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <PerfilProvider>
        <Rotas />
        <ToastContainer />
      </PerfilProvider>
    </>
  );
}

export default App;
