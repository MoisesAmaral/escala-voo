import { useState } from "react";
import HelpPanel from "./components/HelpPanel";
import SituacaoSelector from "./components/SituacaoSelector";
import EscalaGrid from "./pages/EscalaGrid";
import "./styles/layout.css";

export default function App() {
  const [situacao, setSituacao] = useState<
    "Sugerida" | "Divulgada" | "Confirmada"
  >("Confirmada");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">✈️</div>
            <div>
              <h1>Escala de Voo</h1>
              <p className="subtitle">Fevereiro 2026</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="btn-help"
              onClick={() => setShowHelp(!showHelp)}
              title="Ajuda"
            >
              ❓ Como Usar
            </button>
          </div>
        </div>
      </header>

      <SituacaoSelector value={situacao} onChange={setSituacao} />

      <main className="grid-container">
        <EscalaGrid situacao={situacao} />
      </main>

      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="made-with">
              Feito com <span className="heart">❤️</span>
            </span>
            <span className="developer">
              por <strong>Moises Amaral</strong>
            </span>
            <span className="tech-stack">JavaScript & .NET C#</span>
          </div>

          <div className="footer-right">
            <span className="copyright">© 2026 Sistema de Escala de Voo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
