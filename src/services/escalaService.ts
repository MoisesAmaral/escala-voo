import type { ApiResponse } from "../types/types";

const API_URL = "https://backend-db-bugy.onrender.com/escalas";

export interface FetchEscalasParams {
  modeloId?: number;
  situacao?: "Sugerida" | "Divulgada" | "Confirmada";
}

/**
 * Buscar TODAS as escalas da API
 */
export async function fetchEscalas(
  params?: FetchEscalasParams,
): Promise<ApiResponse[]> {
  try {
    const url = new URL(API_URL);

    // Adicionar filtros se necessário
    if (params?.modeloId) {
      url.searchParams.append("modeloId", params.modeloId.toString());
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro ao buscar escalas: ${response.statusText}`);
    }

    const data = await response.json();

    // Retornar sempre como array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Erro ao buscar escalas:", error);
    throw error;
  }
}

/**
 * Buscar uma escala específica por ID
 */
export async function fetchEscalaById(id: number): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar escala: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar escala:", error);
    throw error;
  }
}

/**
 * Salvar alterações na API
 */
export async function saveEscalas(data: ApiResponse): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar escalas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar escalas:", error);
    throw error;
  }
}
