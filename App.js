import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import { UsuarioProvider } from "./context/index";

export default function App() {
  return (
    <UsuarioProvider>
      <NativeBaseProvider>
        <Menu />
        <StatusBar
          backgroundColor="orange"
          style="light"
          barStyle="dark-content"
        />
      </NativeBaseProvider>
    </UsuarioProvider>
  );
}
