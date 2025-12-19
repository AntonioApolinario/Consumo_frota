export interface Abastecimento {
  id: number;
  data: string;
  posto: string;
  cidade: string;
  uf: string;
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

export interface KpiData {
  precoMedioGasolina: number;
  precoMedioDiesel: number;
  totalLitros: number;
  quantidadePostos: number;
}
