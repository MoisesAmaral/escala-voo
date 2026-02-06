interface SituacaoSelectorProps {
  value: "Sugerida" | "Divulgada" | "Confirmada";
  onChange: (value: "Sugerida" | "Divulgada" | "Confirmada") => void;
}

export default function SituacaoSelector({
  value,
  onChange,
}: SituacaoSelectorProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        padding: "12px 20px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#4b5563",
          marginRight: "8px",
          fontSize: 14,
        }}
      >
        📊 Visualizar:
      </span>
      {(["Sugerida", "Divulgada", "Confirmada"] as const).map((sit) => (
        <button
          key={sit}
          onClick={() => onChange(sit)}
          style={{
            fontFamily: "Poppins",
            padding: "8px 20px",
            border: "none",
            borderRadius: "8px",
            background: value === sit ? "#2e6b50" : "#f3f4f6",
            color: value === sit ? "white" : "#6b7280",
            fontWeight: value === sit ? 600 : 500,
            cursor: "pointer",
            fontSize: 13,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (value !== sit) {
              e.currentTarget.style.background = "#e5e7eb";
            }
          }}
          onMouseLeave={(e) => {
            if (value !== sit) {
              e.currentTarget.style.background = "#f3f4f6";
            }
          }}
        >
          {sit}
        </button>
      ))}
    </div>
  );
}
