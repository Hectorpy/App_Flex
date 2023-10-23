import React, { useEffect } from "react";
import Routes from "./components/routes/stackRoutes"; // Importa o componente de rotas
import * as Font from "expo-font";

// Define o componente principal do aplicativo
export default function App() {
  // Função de efeito que carrega as fontes
  useEffect(() => {
    Font.loadAsync({
      'Segoe UI': require('./assets/Segoe-UI.ttf'), // Carrega a fonte "Segoe UI"
      "Segoe UI Bold": require('./assets/Segoe-UI-Bold.ttf'), // Carrega a fonte "Segoe UI Bold"
    });
  })

  // Renderiza o componente de rotas
  return (
    <Routes />
  );
}