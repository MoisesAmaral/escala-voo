import type {
  ApiEscala,
  ApiResponse,
  CodigoDia,
  DiaInfo,
  EscalaLinha,
} from "../types/types";

/**
 * Converte dados da API para o formato do DataGrid
 */
export function adaptarEscalasParaGrid(
  apiData: ApiResponse,
  situacaoFiltro: "Sugerida" | "Divulgada" | "Confirmada" = "Confirmada",
): EscalaLinha[] {
  return apiData.tripulantes.map((tripulante, index) => {
    // Buscar a situação específica
    const situacao = tripulante.situacoes.find(
      (sit) => sit.descricao === situacaoFiltro,
    );

    if (!situacao) {
      return {
        id: tripulante.id,
        nome: tripulante.nome,
        funcao: tripulante.funcao,
        percentual: tripulante.percentual || "0%",
        frota: apiData.descricao,
        dias: criarDiasVazios(),
      };
    }

    // Converter escalas em objeto de dias
    const dias: Record<string, DiaInfo> = criarDiasVazios();

    situacao.escalas.forEach((escala) => {
      const data = new Date(escala.dataEscala);
      const dia = data.getDate();
      const campoDia = `d${String(dia).padStart(2, "0")}`;

      dias[campoDia] = {
        valor: (escala.tipoDeEscala.sigla || "") as CodigoDia,
        obs: escala.observacao || "",
      };
    });

    return {
      id: tripulante.id || index,
      nome: tripulante.nome,
      funcao: tripulante.funcao,
      percentual: tripulante.percentual || "100%",
      frota: apiData.descricao,
      dias,
    };
  });
}

/**
 * Cria objeto com 29 dias vazios
 */
function criarDiasVazios(): Record<string, DiaInfo> {
  const dias: Record<string, DiaInfo> = {};

  for (let i = 1; i <= 29; i++) {
    const campoDia = `d${String(i).padStart(2, "0")}`;
    dias[campoDia] = { valor: "" as CodigoDia, obs: "" };
  }

  return dias;
}

/**
 * Converte dados do Grid de volta para o formato completo da API
 */
export function adaptarGridParaApi(
  gridData: EscalaLinha[],
  apiDataOriginal: ApiResponse,
  situacaoFiltro: "Sugerida" | "Divulgada" | "Confirmada",
  ano: number,
  mes: number,
): ApiResponse {
  // Criar objeto de resposta baseado no original
  const resultado: ApiResponse = {
    ...apiDataOriginal,
    tripulantes: apiDataOriginal.tripulantes.map((tripulante) => {
      // Encontrar os dados atualizados deste tripulante
      const dadosAtualizados = gridData.find(
        (linha) => linha.id === tripulante.id,
      );

      if (!dadosAtualizados) {
        return tripulante; // Mantém original se não encontrou
      }

      // Atualizar a situação específica
      const situacoes = tripulante.situacoes.map((situacao) => {
        if (situacao.descricao !== situacaoFiltro) {
          return situacao; // Mantém outras situações inalteradas
        }

        // Converter dias do grid em escalas
        const escalas: ApiEscala[] = [];

        for (let dia = 1; dia <= 29; dia++) {
          const campoDia = `d${String(dia).padStart(2, "0")}`;
          const diaInfo = dadosAtualizados.dias[campoDia];

          if (diaInfo && diaInfo.valor) {
            const data = new Date(ano, mes - 1, dia);

            escalas.push({
              id: 0, // Será gerado pela API
              dataEscala: data.toISOString().split("T")[0] + "T00:00:00",
              tipoDeEscala: {
                sigla: diaInfo.valor,
                corFundo: "#FFFFFF",
                corFonte: "#000000",
              },
              observacao: diaInfo.obs || null,
            });
          }
        }

        return {
          ...situacao,
          escalas,
        };
      });

      return {
        ...tripulante,
        situacoes,
      };
    }),
  };

  return resultado;
}
