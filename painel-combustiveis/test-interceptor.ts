/**
 * Teste standalone do interceptor sem precisar rodar servidor
 * Simula resposta do backend e verifica transformação
 */

interface BackendResponse {
  items: Array<{
    id: number;
    data_hora: string;
    volume_abastecido: number;
    preco_por_litro: number;
    tipo_combustivel: string;
    cpf_motorista: string;
    placa_veiculo: string;
    id_posto: number;
    motorista: {
      nome_completo: string;
      cpf: string;
    };
    posto: {
      nome_fantasia: string;
      cnpj: string;
    };
    veiculo: {
      placa: string;
      modelo: string;
    };
  }>;
  total: number;
  pagina: number;
  tamanho_pagina: number;
}

interface FrontendResponse {
  dataHora: string;
  volumeAbastecido: number;
  precoPorLitro: number;
  totalPago: number;
  tipoCombustivel: string;
  cpfMotorista: string;
  placaVeiculo: string;
  idPosto: number;
  motorista: {
    nomeCompleto: string;
    cpf: string;
  };
  posto: {
    nomeFantasia: string;
    cnpj: string;
  };
  veiculo: {
    placa: string;
    modelo: string;
  };
}

// Simula resposta do backend
const mockBackendResponse: BackendResponse = {
  items: [
    {
      id: 1,
      data_hora: "2025-01-15T10:30:00",
      volume_abastecido: 45.5,
      preco_por_litro: 5.89,
      tipo_combustivel: "Gasolina Comum",
      cpf_motorista: "123.456.789-00",
      placa_veiculo: "ABC-1234",
      id_posto: 1,
      motorista: {
        nome_completo: "João Silva",
        cpf: "123.456.789-00"
      },
      posto: {
        nome_fantasia: "Posto Exemplo",
        cnpj: "12.345.678/0001-90"
      },
      veiculo: {
        placa: "ABC-1234",
        modelo: "Fiat Uno"
      }
    }
  ],
  total: 100,
  pagina: 1,
  tamanho_pagina: 10
};

// Função de conversão snake_case → camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  
  if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }
  
  return obj;
}

// Simula interceptor
function transformBackendResponse(response: BackendResponse): FrontendResponse[] {
  const transformed = toCamelCase(response);
  
  return transformed.items.map((item: any) => ({
    ...item,
    totalPago: item.volumeAbastecido * item.precoPorLitro
  }));
}

// Executa teste
console.log('=== TESTE DO INTERCEPTOR ===\n');
console.log('Backend Response (snake_case):');
console.log(JSON.stringify(mockBackendResponse.items[0], null, 2));

const result = transformBackendResponse(mockBackendResponse);

console.log('\n\nFrontend Response (camelCase com totalPago):');
console.log(JSON.stringify(result[0], null, 2));

console.log('\n\n=== VALIDAÇÃO ===');
console.log(`✓ dataHora existe: ${!!result[0].dataHora}`);
console.log(`✓ volumeAbastecido existe: ${!!result[0].volumeAbastecido}`);
console.log(`✓ precoPorLitro existe: ${!!result[0].precoPorLitro}`);
console.log(`✓ totalPago calculado: ${result[0].totalPago} (${result[0].volumeAbastecido} × ${result[0].precoPorLitro})`);
console.log(`✓ motorista.nomeCompleto existe: ${!!result[0].motorista?.nomeCompleto}`);
console.log(`✓ posto.nomeFantasia existe: ${!!result[0].posto?.nomeFantasia}`);
console.log(`✓ veiculo convertido: ${!!result[0].veiculo}`);

const expectedTotal = 45.5 * 5.89;
const isCorrect = Math.abs(result[0].totalPago - expectedTotal) < 0.01;
console.log(`\n${isCorrect ? '✅ TESTE PASSOU' : '❌ TESTE FALHOU'}`);
