import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Interceptor que converte respostas do backend (snake_case) para camelCase
 * e adiciona X-API-Key header
 */
export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona API Key em todas as requisições
  const apiReq = req.clone({
    setHeaders: {
      'X-API-Key': 'dev-secret-key'
    }
  });

  return next(apiReq).pipe(
    map(event => {
      if (event instanceof HttpResponse && event.body) {
        // Converte response do backend para formato do frontend
        const body = convertBackendResponse(event.body);
        return event.clone({ body });
      }
      return event;
    })
  );
};

/**
 * Converte estrutura de dados do backend para frontend
 */
function convertBackendResponse(data: any): any {
  if (!data) return data;

  // Se for resposta paginada do backend
  if (data.items && Array.isArray(data.items)) {
    return data.items.map((item: any) => convertAbastecimento(item));
  }

  // Se for array direto
  if (Array.isArray(data)) {
    return data.map((item: any) => convertAbastecimento(item));
  }

  // Item único
  return convertAbastecimento(data);
}

/**
 * Converte um abastecimento do formato backend para frontend
 */
function convertAbastecimento(item: any): any {
  if (!item) return item;

  // Calcula total pago
  const valorLitro = parseFloat(item.preco_por_litro || 0);
  const litros = parseFloat(item.volume_abastecido || 0);
  const totalPago = valorLitro * litros;

  return {
    id: item.id,
    data: item.data_hora,
    posto: item.posto?.nome || 'Posto Desconhecido',
    cidade: item.posto?.cidade || '',
    uf: item.posto?.uf || '',
    regiao: item.posto?.regiao || '',
    tipoCombustivel: mapTipoCombustivel(item.tipo_combustivel),
    valorLitro: valorLitro,
    litros: litros,
    totalPago: totalPago,
    motorista: {
      nome: item.motorista?.nome || 'Não informado',
      cpf: item.cpf_motorista || item.motorista?.cpf || ''
    },
    veiculo: item.veiculo ? {
      placa: item.veiculo.placa || item.placa_veiculo || '',
      modelo: item.veiculo.modelo || ''
    } : {
      placa: item.placa_veiculo || '',
      modelo: ''
    }
  };
}

/**
 * Mapeia tipo de combustível do backend para frontend
 */
function mapTipoCombustivel(tipo: string): string {
  const map: { [key: string]: string } = {
    'GASOLINA': 'Gasolina',
    'DIESEL': 'Diesel',
    'ETANOL': 'Etanol'
  };
  return map[tipo] || tipo;
}
