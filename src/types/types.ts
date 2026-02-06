import React from "react";

export type CodigoDia =
  | "E"
  | "F"
  | "FS"
  | "FP"
  | "T"
  | "SM"
  | "CR"
  | "FE"
  | "DM"
  | "AD"
  | "LP"
  | "LM"
  | "FB"
  | "LN"
  | "LC"
  | "BRU"
  | "BRN"
  | "BLL"
  | "";

export type DiaInfo = {
  valor: CodigoDia;
  obs?: string;
};

export interface Balanco {
  programadas: number;
  necessarias: number;
  faltante: number;
  ps: number;
  ferias: number;
}

export interface EscalaLinha {
  id: number;
  percentual: string;
  funcao: string;
  nome: string;
  frota: string;
  dias: Record<string, DiaInfo>;
  balanco?: Balanco; // ← OPCIONAL (calculado no front)
}

export interface ApiResponse {
  id: number;
  aeronaveId: number;
  modeloId: number;
  nome: string;
  descricao: string;
  tripulantes: ApiTripulante[];
}

export interface ApiTripulante {
  id: number;
  nome: string;
  apelido: string;
  funcao: string;
  percentual?: string;
  situacoes: ApiSituacao[];
}

export interface ApiSituacao {
  id: number;
  descricao: "Sugerida" | "Divulgada" | "Confirmada";
  escalas: ApiEscala[];
}

export interface ApiEscala {
  id: number;
  dataEscala: string;
  tipoDeEscala: {
    sigla: string;
    corFundo: string;
    corFonte: string;
  };
  observacao: string | null;
}

// Column interface para DataGrid
export interface Column<T> {
  id: string;
  header: string | React.ReactNode; // ← ATUALIZADO
  width?: number;
  minWidth?: number;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  editable?: boolean;
  editor?: "select" | "text" | "custom";
  options?: string[];
  getStyle?: (value: any, row: T) => React.CSSProperties;
  getValue?: (row: T) => any;
  setValue?: (row: T, value: any) => void;
  onDoubleClick?: (
    row: T,
    rowIndex: number,
    column: Column<T>,
    event: React.MouseEvent,
  ) => void;
  pinned?: "left" | "right";
  getTooltip?: (row: T) => string | null;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  onDataChange?: (data: T[]) => void;
  rowHeight?: number;
  enableFillHandle?: boolean;
  enableRowDrag?: boolean;
  className?: string;
}
