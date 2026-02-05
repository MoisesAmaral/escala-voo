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

export interface EscalaLinha {
  id: number;
  percentual: number;
  funcao: "CMTE" | "COP";
  nome: string;
  frota: string;
  dias: Record<string, DiaInfo>;
}
