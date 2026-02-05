import { useState } from "react";
import { DataGrid, type Column } from "../components/DataGrid";
import ModalNotificacao from "../components/ModalNotificacao";
import PopoverDia from "../components/PopoverDia";
import { dadosFake } from "../data/mockData";
import type { CodigoDia, DiaInfo, EscalaLinha } from "../types/types";
import "./EscalaGrid.css";

interface ModalInfo {
  tipo: "sucesso" | "erro";
  titulo: string;
  piloto: string;
  dia: string;
  codigo: string;
}

const codigos: CodigoDia[] = [
  "E",
  "F",
  "FS",
  "FP",
  "T",
  "SM",
  "CR",
  "FE",
  "DM",
  "AD",
  "LP",
  "LM",
  "FB",
  "LN",
  "LC",
  "BRU",
  "BRN",
  "BLL",
  "",
];

const cores: Record<CodigoDia, string | undefined> = {
  FE: "#d0e1ff",
  DM: "#d0e1ff",
  SM: "#fff6aa",
  FS: "#ffb3b3",
  F: "#ffb3b3",
  FP: "#ffb3b3",
  BRU: "#b3ccff",
  BRN: "#ffcccc",
  BLL: "#b3ccff",
  E: undefined,
  CR: undefined,
  AD: undefined,
  LP: undefined,
  LM: undefined,
  FB: undefined,
  LN: undefined,
  LC: undefined,
  T: undefined,
  "": undefined,
};

export default function EscalaGrid() {
  const [data, setData] = useState<EscalaLinha[]>(dadosFake);

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTexto, setModalTexto] = useState<ModalInfo | null>(null);

  // POPOVER
  const [popoverAnchor, setPopoverAnchor] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [popoverData, setPopoverData] = useState<{
    linhaIndex: number;
    campoDia: string;
    diaInfo: DiaInfo;
  } | null>(null);

  const salvarObs = (obs: string) => {
    if (!popoverData) return;

    setData((prev) => {
      const copia = [...prev];
      const linha = copia[popoverData.linhaIndex];

      linha.dias[popoverData.campoDia] = {
        ...linha.dias[popoverData.campoDia],
        obs,
      };

      return copia;
    });
  };

  // DEFINIR COLUNAS
  const columns: Column<EscalaLinha>[] = [
    {
      id: "percentual",
      header: "%",
      width: 55,
      pinned: "left",
      getValue: (row) => row.percentual,
    },
    {
      id: "funcao",
      header: "Função",
      width: 75,
      pinned: "left",
      getValue: (row) => row.funcao,
    },
    {
      id: "nome",
      header: "Piloto",
      width: 150,
      pinned: "left",
      getValue: (row) => row.nome,
      render: (value) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0 6px",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#2e6b50",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 11,
            }}
          >
            {value.substring(0, 2)}
          </div>
          <span style={{ fontSize: 12 }}>{value}</span>
        </div>
      ),
    },
    // 29 DIAS
    ...Array.from({ length: 29 }, (_, i) => {
      const campoDia = `d${String(i + 1).padStart(2, "0")}`;

      return {
        id: campoDia,
        header: String(i + 1),
        width: 42,
        minWidth: 42,
        editable: true,
        editor: "select" as const,
        options: codigos,
        getValue: (row: EscalaLinha) => row.dias[campoDia]?.valor || "",
        setValue: (row: EscalaLinha, value: any) => {
          if (!row.dias[campoDia]) {
            row.dias[campoDia] = { valor: "", obs: "" };
          }
          row.dias[campoDia].valor = value as CodigoDia;
        },
        getStyle: (value: any) => {
          const cor = cores[value as CodigoDia];
          return cor ? { backgroundColor: cor } : {};
        },
        getTooltip: (row: EscalaLinha) => {
          const obs = row.dias[campoDia]?.obs;
          return obs && obs.trim() ? `📝 ${obs}` : null;
        },
        onDoubleClick: (
          row: EscalaLinha,
          rowIndex: number,
          _column: any,
          event: React.MouseEvent,
        ) => {
          // ✅ VALIDAÇÃO: Só abre popover se célula tiver valor
          const valorAtual = row.dias[campoDia]?.valor;

          if (!valorAtual || valorAtual.trim() === "") {
            // Mostrar feedback visual de erro
            setModalTexto({
              tipo: "erro",
              titulo: "Célula vazia",
              piloto: row.nome,
              dia: `Dia ${i + 1}`,
              codigo: "Preencha a célula antes de adicionar observação",
            });
            setModalOpen(true);
            return;
          }

          // Se tem valor, abre o popover
          const rect = (event.target as HTMLElement).getBoundingClientRect();

          setPopoverAnchor({
            top: rect.top,
            left: rect.left,
          });

          setPopoverData({
            linhaIndex: rowIndex,
            campoDia,
            diaInfo: row.dias[campoDia],
          });
        },
        render: (value: any, row: EscalaLinha) => {
          const temObs =
            row.dias[campoDia]?.obs && row.dias[campoDia].obs.trim().length > 0;
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                fontSize: 12,
                cursor: value && value.trim() ? "pointer" : "default", // ← Cursor indica se pode adicionar obs
              }}
            >
              <span>{value}</span>
              {temObs && <span style={{ fontSize: 9 }}>📝</span>}
            </div>
          );
        },
      };
    }),
  ];

  const handleDataChange = (newData: EscalaLinha[]) => {
    setData(newData);

    setModalTexto({
      tipo: "sucesso",
      titulo: "Células atualizadas",
      piloto: "Múltiplas células",
      dia: "Múltiplos dias",
      codigo: "Aplicado",
    });
    setModalOpen(true);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <DataGrid
        columns={columns}
        data={data}
        onDataChange={handleDataChange}
        rowHeight={40}
        enableFillHandle={true}
        enableRowDrag={true}
        className="escala-grid"
      />

      <ModalNotificacao
        open={modalOpen}
        texto={modalTexto}
        onClose={() => setModalOpen(false)}
      />

      <PopoverDia
        anchor={popoverAnchor}
        diaInfo={popoverData?.diaInfo || null}
        onClose={() => setPopoverAnchor(null)}
        onSave={salvarObs}
      />
    </div>
  );
}
