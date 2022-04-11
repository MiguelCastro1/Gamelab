import { createContext, useContext, useState } from "react";

const PerfilContext = createContext();

export default function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState({});
  const [flagResetImage, setFlagResetImage] = useState(false);

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        setPerfil,
        flagResetImage,
        setFlagResetImage,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
}

export function useTypePerfil() {
  const { perfil, setPerfil, flagResetImage, setFlagResetImage } =
    useContext(PerfilContext);
  return { perfil, setPerfil, flagResetImage, setFlagResetImage };
}
