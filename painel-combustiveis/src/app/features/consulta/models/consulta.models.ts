import { Abastecimento } from '../../dashboard/models/dashboard.models';

export interface FiltrosConsulta {
  uf?: string;
  tipoCombustivel?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface PaginacaoConfig {
  paginaAtual: number;
  itensPorPagina: number;
  totalItens: number;
}

export { Abastecimento };
