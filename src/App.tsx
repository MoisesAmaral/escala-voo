import EscalaGrid from "./pages/EscalaGrid";
import "./styles/layout.css";

export default function App() {
  const currentYear = new Date().getFullYear();

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
        </div>
      </header>

      <div className="instructions-bar">
        <div className="instruction-item">
          <span className="icon">🖱️</span>
          <span>Clique para editar</span>
        </div>
        <div className="instruction-item">
          <span className="icon">🎯</span>
          <span>Arraste o quadrado verde para preencher</span>
        </div>
        <div className="instruction-item">
          <span className="icon">📝</span>
          <span>Duplo clique para observações</span>
        </div>
        <div className="instruction-item">
          <span className="icon">⋮⋮</span>
          <span>Arraste para reordenar</span>
        </div>
      </div>

      <main className="grid-container">
        <EscalaGrid />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="made-with">
              Feito com <span className="heart">❤️</span> por
            </span>
            <span className="developer">
              <strong>Moises Amaral</strong>
            </span>
            <span className="tech-stack">
              Desenvolvedor Fullstack • JavaScript & .NET C#
            </span>
          </div>

          <div className="footer-right">
            <span className="copyright">
              © {currentYear} Todos os direitos reservados
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
