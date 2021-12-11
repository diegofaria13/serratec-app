import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UsuarioContext = createContext();
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    AsyncStorage.getItem("@usuario").then((login) => {
      const usuarioObj = login ? JSON.parse(login) : undefined;
      setUsuario(usuarioObj);
    });
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
