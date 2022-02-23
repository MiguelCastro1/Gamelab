import { createContext, useContext, useState } from "react";

const PerfilContext = createContext();

export default function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState("");

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        setPerfil,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
}

export function useTypePerfil() {
  const context = useContext(PerfilContext);
  const { perfil, setPerfil } = context;
  return { perfil, setPerfil };
}
