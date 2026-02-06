import { useState } from "react";
import type { EscalaLinha } from "../types/types";
import "./AeronaveSection.css";
import { DataGrid, type Column } from "./DataGrid";

interface AeronaveSectionProps {
  aeronave: {
    id: number;
    nome: string;
    descricao: string;
    status: "Sugerida" | "Divulgada" | "Confirmada";
  };
  tripulantes: EscalaLinha[];
  columns: Column<EscalaLinha>[];
  onDataChange: (
    aeronaveId: number,
    newData: EscalaLinha[],
    changeInfo?: {
      rowIndex?: number;
      columnId?: string;
      oldValue?: any;
      newValue?: any;
      isMultiple?: boolean;
    },
  ) => void;
  defaultExpanded?: boolean;
}

export default function AeronaveSection({
  aeronave,
  tripulantes,
  columns,
  onDataChange,
  defaultExpanded = false,
}: AeronaveSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const statusColors = {
    Sugerida: "#fbbf24",
    Divulgada: "#60a5fa",
    Confirmada: "#34d399",
  };

  const statusColor = statusColors[aeronave.status];

  return (
    <div className="aeronave-section">
      <div
        className={`aeronave-header ${expanded ? "expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="aeronave-info">
          <div className="aeronave-icon">✈️</div>
          <div className="aeronave-details">
            <h3>{aeronave.nome}</h3>
            <span className="aeronave-descricao">{aeronave.descricao}</span>
          </div>
        </div>

        <div className="aeronave-meta">
          <div className="tripulantes-count">
            <span className="count-badge">{tripulantes.length}</span>
            <span className="count-label">tripulantes</span>
          </div>

          <div
            className="status-badge"
            style={{
              background: statusColor,
              color: "white",
            }}
          >
            {aeronave.status}
          </div>

          <button className="collapse-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="aeronave-content">
          <DataGrid
            columns={columns}
            data={tripulantes}
            onDataChange={(newData, changeInfo) => {
              console.log("🔄 AeronaveSection recebeu changeInfo:", changeInfo);
              onDataChange(aeronave.id, newData, changeInfo);
            }}
            rowHeight={40}
            enableFillHandle={true}
            enableRowDrag={true}
            className="escala-grid"
          />
        </div>
      )}
    </div>
  );
}
