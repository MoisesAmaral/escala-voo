// src/utils/balancoCalculator.ts
import type { Balanco, DiaInfo } from "../types/types";

/**
 * Calcula o balanço de folgas com base nos dias preenchidos
 */
export function calcularBalanco(
  dias: Record<string, DiaInfo>,
  ps: number = 2,
  ferias: number = 0,
): Balanco {
  const folgasCodigos = ["F", "FS", "FP", "FB"];

  const programadas = Object.values(dias).filter((dia) =>
    folgasCodigos.includes(dia.valor),
  ).length;

  const necessarias = 8; // Meta padrão
  const faltante = Math.max(0, necessarias - programadas);

  return {
    programadas,
    necessarias,
    faltante,
    ps,
    ferias,
  };
}
