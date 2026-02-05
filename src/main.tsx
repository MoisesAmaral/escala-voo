import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Simular carregamento de recursos
const initializeApp = async () => {
  // Simular carregamento de dados, APIs, etc
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Remover loading screen
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.remove();
    }, 2500);
  }
};

// Inicializar app
initializeApp();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
