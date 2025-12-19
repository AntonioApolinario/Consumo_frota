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
