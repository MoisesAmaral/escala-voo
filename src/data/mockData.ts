import type { CodigoDia, DiaInfo, EscalaLinha } from "../types/types";

// cria os 29 dias com o novo formato { valor, obs }
const criarDias = (valor: CodigoDia = ""): Record<string, DiaInfo> =>
  Object.fromEntries(
    Array.from({ length: 29 }, (_, i) => [
      `d${String(i + 1).padStart(2, "0")}`,
      { valor, obs: "" },
    ]),
  ) as Record<string, DiaInfo>;

export const dadosFake: EscalaLinha[] = [
  {
    id: 1,
    percentual: 46,
    funcao: "CMTE",
    nome: "PITTELLA",
    frota: "F21",
    dias: {
      ...criarDias(""),
      d01: { valor: "BRN", obs: "" },
      d02: { valor: "BRN", obs: "" },
      d03: { valor: "BRN", obs: "" },
      d04: { valor: "BRN", obs: "" },
    },
  },
  {
    id: 2,
    percentual: 0,
    funcao: "CMTE",
    nome: "TYSON",
    frota: "F19",
    dias: {
      ...criarDias(""),
      d01: { valor: "BRU", obs: "" },
      d02: { valor: "BRU", obs: "" },
      d03: { valor: "BRN", obs: "" },
      d04: { valor: "FE", obs: "" },
      d05: { valor: "FE", obs: "" },
      d06: { valor: "FE", obs: "" },
      d07: { valor: "FE", obs: "" },
    },
  },
  {
    id: 3,
    percentual: 12,
    funcao: "COP",
    nome: "RODRIGUES",
    frota: "F19",
    dias: criarDias("SM"),
  },
  {
    id: 4,
    percentual: 33,
    funcao: "CMTE",
    nome: "SILVA",
    frota: "F23",
    dias: criarDias("AD"),
  },
  {
    id: 5,
    percentual: 50,
    funcao: "COP",
    nome: "NOGUEIRA",
    frota: "F21",
    dias: criarDias("FS"),
  },
  {
    id: 6,
    percentual: 10,
    funcao: "CMTE",
    nome: "BARBOSA",
    frota: "F23",
    dias: criarDias("FE"),
  },
  {
    id: 7,
    percentual: 22,
    funcao: "COP",
    nome: "ALMEIDA",
    frota: "F19",
    dias: criarDias("BRU"),
  },
  {
    id: 8,
    percentual: 28,
    funcao: "COP",
    nome: "FREITAS",
    frota: "F21",
    dias: criarDias("BRN"),
  },
  {
    id: 9,
    percentual: 37,
    funcao: "CMTE",
    nome: "COSTA",
    frota: "F19",
    dias: criarDias("BLL"),
  },
  {
    id: 10,
    percentual: 41,
    funcao: "COP",
    nome: "PEREIRA",
    frota: "F23",
    dias: criarDias("FP"),
  },
];
