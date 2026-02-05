import "./modal.css";

export default function ModalNotificacao({ open, texto, onClose }: any) {
  if (!open || !texto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">
            {texto.tipo === "erro" ? "❌" : "✔"}
          </span>
          <h2>{texto.titulo}</h2>
        </div>

        <div className="modal-body">
          <p>
            <strong>Piloto:</strong> {texto.piloto}
          </p>
          <p>
            <strong>Data:</strong> {texto.dia}
          </p>
          <p>
            <strong>Código aplicado:</strong> {texto.codigo}
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-ok" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
