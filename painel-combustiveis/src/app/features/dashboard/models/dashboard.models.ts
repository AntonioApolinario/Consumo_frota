export interface Abastecimento {
  id: number;
  data: string;
  posto: string;
  cidade: string;
  uf: string;
  regiao?: string;
  tipoCombustivel: string;
  valorLitro: number;
  litros: number;
  totalPago: number;
  motorista: {
    nome: string;
    cpf: string;
  };
  veiculo: {
    placa: string;
    modelo: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pagina?: number;
  limite?: number;
}

export interface AbastecimentoBackend {
  id: number;
  data_hora: string;
  tipo_combustivel: string;
  preco_por_litro: string;
  volume_abastecido: string;
  posto: {
    nome: string;
    cidade: string;
    uf: string;
    regiao: string;
  };
  motorista: {
    nome: string;
    cpf: string;
  };
  veiculo: {
    placa: string;
    modelo: string;
  } | null;
}

export interface DrillDownLevel {
  type: 'regiao' | 'estado' | 'municipio';
  value: string;
  parent?: string;
  excludedItems?: string[]; // Para expandir "Outros" recursivamente
}

export interface ChartDataPoint {
  label: string;
  value: number;
  percentage: number;
  isOthers?: boolean;
  level: DrillDownLevel;
}

export interface KpiData {
  precoMedioGasolina: number;
  precoMedioDiesel: number;
  totalLitros: number;
  quantidadePostos: number;
}
