import { useEffect, useState } from "react";

import { adaptarEscalasParaGrid } from "../adapters/escalaAdapter";
import AeronaveSection from "../components/AeronaveSection";
import type { Column } from "../components/DataGrid";
import ModalNotificacao from "../components/ModalNotificacao";
import PopoverDia from "../components/PopoverDia";
import Toast from "../components/Toast";
import { fetchEscalas } from "../services/escalaService";
import type {
  ApiResponse,
  CodigoDia,
  DiaInfo,
  EscalaLinha,
} from "../types/types";
import { calcularBalanco } from "../utils/balancoCalculator"; // ← IMPORT
import "./EscalaGrid.css";

interface EscalaGridProps {
  situacao: "Sugerida" | "Divulgada" | "Confirmada";
}

interface ModalInfo {
  tipo: "sucesso" | "erro";
  titulo: string;
  piloto: string;
  dia: string;
  codigo: string;
}

interface AeronaveData {
  aeronave: {
    id: number;
    nome: string;
    descricao: string;
    status: "Sugerida" | "Divulgada" | "Confirmada";
  };
  tripulantes: EscalaLinha[];
  apiDataOriginal: ApiResponse;
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

export default function EscalaGrid({ situacao }: EscalaGridProps) {
  const [aeronaves, setAeronaves] = useState<AeronaveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTexto, setModalTexto] = useState<ModalInfo | null>(null);

  const [popoverAnchor, setPopoverAnchor] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [popoverData, setPopoverData] = useState<{
    aeronaveId: number;
    linhaIndex: number;
    campoDia: string;
    diaInfo: DiaInfo;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const todasAeronaves = await fetchEscalas();

        const aeronavesProcesadas: AeronaveData[] = todasAeronaves.map(
          (apiData) => {
            const dadosAdaptados = adaptarEscalasParaGrid(apiData, situacao);

            // ✅ ADICIONAR BALANÇO APÓS ADAPTAR
            const dadosComBalanco = dadosAdaptados.map((linha) => ({
              ...linha,
              balanco: calcularBalanco(linha.dias, 2, 0),
            }));

            return {
              aeronave: {
                id: apiData.id,
                nome: apiData.nome,
                descricao: apiData.descricao,
                status: situacao,
              },
              tripulantes: dadosComBalanco,
              apiDataOriginal: apiData,
            };
          },
        );

        setAeronaves(aeronavesProcesadas);
      } catch (err) {
        setError("Erro ao carregar dados da API");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [situacao]);

  const salvarObs = (obs: string) => {
    if (!popoverData) return;

    setAeronaves((prev) =>
      prev.map((aeronaveData) => {
        if (aeronaveData.aeronave.id !== popoverData.aeronaveId) {
          return aeronaveData;
        }

        const novosTripulantes = [...aeronaveData.tripulantes];
        const linha = novosTripulantes[popoverData.linhaIndex];

        linha.dias[popoverData.campoDia] = {
          ...linha.dias[popoverData.campoDia],
          obs,
        };

        return {
          ...aeronaveData,
          tripulantes: novosTripulantes,
        };
      }),
    );
  };

  const criarColunas = (aeronaveId: number): Column<EscalaLinha>[] => {
    const getDiaDaSemana = (dia: number, mes: number, ano: number): string => {
      const date = new Date(ano, mes - 1, dia);
      const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
      return dias[date.getDay()];
    };

    const getCor = (diaSemana: string): string => {
      switch (diaSemana) {
        case "S":
          return "#ef4444";
        case "D":
          return "#ef4444";
        default:
          return "#9ca3af";
      }
    };

    const ano = 2026;
    const mes = 2;

    return [
      // ✅ COLUNAS FIXAS
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
        width: 120,
        pinned: "left",
        getValue: (row) => {
          const nomes = row.nome.trim().split(/\s+/);
          return nomes[nomes.length - 1];
        },
        getTooltip: (row) => row.nome,
        render: (value, row) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8px",
              cursor: "help",
            }}
            title={row.nome}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>
              {value}
            </span>
          </div>
        ),
      },

      // ✅ COLUNAS DE BALANÇO (NOVAS)
      {
        id: "programadas",
        header: (
          <div style={{ fontSize: 10, lineHeight: 1.2, textAlign: "center" }}>
            Prog.
          </div>
        ),
        width: 50,
        getValue: (row) => row.balanco?.programadas || 0,
        render: (value) => (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1f2937",
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        id: "necessarias",
        header: (
          <div style={{ fontSize: 10, lineHeight: 1.2, textAlign: "center" }}>
            Nec.
          </div>
        ),
        width: 50,
        getValue: (row) => row.balanco?.necessarias || 8,
        render: (value) => (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1f2937",
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        id: "faltante",
        header: (
          <div style={{ fontSize: 10, lineHeight: 1.2, textAlign: "center" }}>
            Falt.
          </div>
        ),
        width: 50,
        getValue: (row) => row.balanco?.faltante || 0,
        getStyle: (value) => ({
          backgroundColor: value > 0 ? "#ffb3b3" : "transparent",
        }),
        render: (value) => (
          <div
            style={{
              fontSize: 12,
              fontWeight: value > 0 ? 700 : 600,
              color: value > 0 ? "#dc2626" : "#1f2937",
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        id: "ps",
        header: "PS",
        width: 45,
        getValue: (row) => row.balanco?.ps || 2,
        getStyle: (value) => ({
          backgroundColor: value === 5 ? "#b3ffb3" : "transparent",
        }),
        render: (value) => (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: value === 5 ? "#16a34a" : "#1f2937",
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        id: "ferias",
        header: (
          <div style={{ fontSize: 10, lineHeight: 1.2, textAlign: "center" }}>
            Férias
          </div>
        ),
        width: 50,
        getValue: (row) => row.balanco?.ferias || 0,
        render: (value) => (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1f2937",
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ),
      },

      // ✅ COLUNAS DE DIAS
      ...Array.from({ length: 29 }, (_, i) => {
        const dia = i + 1;
        const campoDia = `d${String(dia).padStart(2, "0")}`;
        const diaSemana = getDiaDaSemana(dia, mes, ano);
        const cor = getCor(diaSemana);
        const isFimDeSemana = diaSemana === "S" || diaSemana === "D";

        return {
          id: campoDia,
          header: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "6px 2px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: isFimDeSemana
                    ? `linear-gradient(135deg, ${cor} 0%, ${cor}dd 100%)`
                    : "transparent",
                  color: isFimDeSemana ? "white" : "#9ca3af",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontWeight: isFimDeSemana ? 700 : 600,
                  border: isFimDeSemana ? "none" : "1px solid #e5e7eb",
                  boxShadow: isFimDeSemana
                    ? "0 1px 3px rgba(239, 68, 68, 0.3)"
                    : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {diaSemana}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: isFimDeSemana ? "#ef4444" : "#6b7280",
                  lineHeight: 1,
                }}
              >
                {dia}
              </span>
            </div>
          ),
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
            const corCelula = cores[value as CodigoDia];
            return corCelula ? { backgroundColor: corCelula } : {};
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
            const valorAtual = row.dias[campoDia]?.valor;

            if (!valorAtual || valorAtual.trim() === "") {
              setModalTexto({
                tipo: "erro",
                titulo: "Célula vazia",
                piloto: row.nome,
                dia: `Dia ${dia}`,
                codigo: "Preencha a célula antes de adicionar observação",
              });
              setModalOpen(true);
              return;
            }

            const rect = (event.target as HTMLElement).getBoundingClientRect();

            setPopoverAnchor({
              top: rect.top,
              left: rect.left,
            });

            setPopoverData({
              aeronaveId,
              linhaIndex: rowIndex,
              campoDia,
              diaInfo: row.dias[campoDia],
            });
          },
          render: (value: any, row: EscalaLinha) => {
            const temObs =
              row.dias[campoDia]?.obs &&
              row.dias[campoDia].obs.trim().length > 0;
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  fontSize: 12,
                  cursor: value && value.trim() ? "pointer" : "default",
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
  };

  const handleDataChange = (
    aeronaveId: number,
    newData: EscalaLinha[],
    changeInfo?: {
      rowIndex?: number;
      columnId?: string;
      oldValue?: any;
      newValue?: any;
      isMultiple?: boolean;
    },
  ) => {
    // ✅ RECALCULAR BALANÇO após mudança
    const dataComBalanco = newData.map((linha) => ({
      ...linha,
      balanco: calcularBalanco(
        linha.dias,
        linha.balanco?.ps || 2,
        linha.balanco?.ferias || 0,
      ),
    }));

    setAeronaves((prev) =>
      prev.map((aeronaveData) =>
        aeronaveData.aeronave.id === aeronaveId
          ? { ...aeronaveData, tripulantes: dataComBalanco }
          : aeronaveData,
      ),
    );

    if (changeInfo?.isMultiple) {
      setModalTexto({
        tipo: "sucesso",
        titulo: "Células atualizadas",
        piloto: "Múltiplas alterações",
        dia: "Múltiplos dias",
        codigo: "Aplicado em lote",
      });
      setModalOpen(true);
    } else if (
      changeInfo &&
      changeInfo.rowIndex !== undefined &&
      changeInfo.columnId
    ) {
      const linha = dataComBalanco[changeInfo.rowIndex];
      const diaMatch = changeInfo.columnId.match(/^d(\d+)$/);

      if (linha && diaMatch) {
        const numeroDia = parseInt(diaMatch[1]);
        const nomes = linha.nome.trim().split(/\s+/);
        const sobrenome = nomes[nomes.length - 1];

        setToastMessage(
          `${sobrenome} • Dia ${numeroDia}: ${changeInfo.newValue || "Vazio"}`,
        );
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 16,
          color: "#6b7280",
        }}
      >
        ⏳ Carregando dados...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 16,
          color: "#ef4444",
        }}
      >
        ❌ {error}
      </div>
    );
  }

  if (aeronaves.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: 48 }}>✈️</div>
        <div style={{ fontSize: 16, color: "#6b7280" }}>
          Nenhuma aeronave encontrada
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflow: "auto",
        padding: "8px",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: 24 }}>🛩️</span>
          <div>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              {aeronaves.length}{" "}
              {aeronaves.length === 1 ? "Aeronave" : "Aeronaves"}
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                color: "#6b7280",
              }}
            >
              Situação: {situacao}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#6b7280", marginRight: "4px" }}>
            Legenda:
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                background: "transparent",
                color: "#9ca3af",
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                fontWeight: 600,
                border: "1px solid #e5e7eb",
              }}
            >
              S
            </div>
            <span style={{ fontSize: 11, color: "#6b7280" }}>Dias úteis</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                background:
                  "linear-gradient(135deg, #ef4444 0%, #ef4444dd 100%)",
                color: "white",
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                fontWeight: 700,
                boxShadow: "0 1px 3px rgba(239, 68, 68, 0.3)",
              }}
            >
              D
            </div>
            <span style={{ fontSize: 11, color: "#6b7280" }}>
              Fim de semana
            </span>
          </div>
        </div>
      </div>

      {aeronaves.map((aeronaveData, index) => (
        <AeronaveSection
          key={aeronaveData.aeronave.id}
          aeronave={aeronaveData.aeronave}
          tripulantes={aeronaveData.tripulantes}
          columns={criarColunas(aeronaveData.aeronave.id)}
          onDataChange={handleDataChange}
          defaultExpanded={index === 0}
        />
      ))}

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

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          duration={4000}
        />
      )}
    </div>
  );
}
