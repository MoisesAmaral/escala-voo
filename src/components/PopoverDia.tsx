import { useEffect, useState } from "react";
import "./popoverDia.css";
import type { DiaInfo } from "./types";

interface PopoverDiaProps {
  anchor: { top: number; left: number } | null;
  diaInfo: DiaInfo | null;
  onSave: (obs: string) => void;
  onClose: () => void;
}

export default function PopoverDia({
  anchor,
  diaInfo,
  onSave,
  onClose,
}: PopoverDiaProps) {
  const [obs, setObs] = useState("");

  useEffect(() => {
    if (diaInfo) {
      setObs(diaInfo.obs || "");
    }
  }, [diaInfo]);

  if (!anchor || !diaInfo) return null;

  return (
    <>
      <div className="popover-overlay" onClick={onClose} />
      <div
        className="popover-dia"
        style={{
          top: anchor.top + 50,
          left: Math.max(20, anchor.left - 100),
        }}
      >
        <div className="popover-header">
          <span className="popover-title">📝 Observação</span>
          <button className="popover-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <textarea
          className="popover-input"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Digite uma observação para este dia..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && e.ctrlKey) {
              onSave(obs);
              onClose();
            }
          }}
        />

        <div className="popover-footer">
          <span className="popover-hint">Ctrl+Enter para salvar rápido</span>
          <div className="popover-buttons">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn-ok"
              onClick={() => {
                onSave(obs);
                onClose();
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
