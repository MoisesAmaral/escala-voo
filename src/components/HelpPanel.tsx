import "./HelpPanel.css";

interface HelpPanelProps {
  onClose: () => void;
}

export default function HelpPanel({ onClose }: HelpPanelProps) {
  return (
    <>
      <div className="help-backdrop" onClick={onClose} />

      <div className="help-panel">
        <div className="help-header">
          <h2>💡 Como Usar o Sistema</h2>
          <button className="help-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="help-content">
          <div className="help-section">
            <div className="help-icon">🖱️</div>
            <div className="help-text">
              <h3>Editar Códigos</h3>
              <p>
                Clique uma vez na célula do dia para abrir o dropdown e
                selecionar um código de voo.
              </p>
            </div>
          </div>

          <div className="help-section">
            <div className="help-icon">🎯</div>
            <div className="help-text">
              <h3>Preencher em Lote</h3>
              <p>
                Selecione uma célula e arraste o <strong>quadrado verde</strong>{" "}
                no canto para preencher múltiplas células rapidamente.
              </p>
            </div>
          </div>

          <div className="help-section">
            <div className="help-icon">📝</div>
            <div className="help-text">
              <h3>Adicionar Observações</h3>
              <p>
                <strong>Duplo clique</strong> em uma célula preenchida para
                adicionar observações. Células vazias não podem ter observações.
              </p>
            </div>
          </div>

          <div className="help-section">
            <div className="help-icon">⋮⋮</div>
            <div className="help-text">
              <h3>Reordenar Tripulantes</h3>
              <p>
                Clique e arraste pela coluna <strong>⋮⋮</strong> à esquerda para
                reordenar os tripulantes.
              </p>
            </div>
          </div>

          <div className="help-section">
            <div className="help-icon">🔽</div>
            <div className="help-text">
              <h3>Expandir/Colapsar Aeronaves</h3>
              <p>
                Clique no cabeçalho de cada aeronave para expandir ou colapsar a
                visualização da escala.
              </p>
            </div>
          </div>

          <div className="help-section">
            <div className="help-icon">💬</div>
            <div className="help-text">
              <h3>Visualizar Observações</h3>
              <p>
                Células com ícone 📝 possuem observações.{" "}
                <strong>Passe o mouse</strong> sobre elas para visualizar
                rapidamente.
              </p>
            </div>
          </div>

          <div className="help-section legend-section">
            <h3>🎨 Legenda de Cores</h3>
            <div className="legend-grid">
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: "#ffb3b3" }}
                ></span>
                <span>Folga (F, FS, FP)</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: "#fff6aa" }}
                ></span>
                <span>Sobreaviso (SM)</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: "#d0e1ff" }}
                ></span>
                <span>Disponível (FE, DM)</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: "#b3ccff" }}
                ></span>
                <span>Base (BRU, BLL)</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: "#ffcccc" }}
                ></span>
                <span>Briefing (BRN)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
