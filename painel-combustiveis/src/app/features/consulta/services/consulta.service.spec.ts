import { TestBed } from '@angular/core/testing';
import { ConsultaService } from './consulta.service';
import { ApiService } from '../../../core';
import { of } from 'rxjs';
import { Abastecimento } from '../models/consulta.models';

describe('ConsultaService', () => {
  let service: ConsultaService;
  let apiService: ApiService;

  beforeEach(() => {
    const apiServiceMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ConsultaService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(ConsultaService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get abastecimentos from API', (done) => {
    const mockAbastecimentos: Abastecimento[] = [
      {
        id: 1,
        data: '2024-01-15',
        posto: 'Posto BR',
        cidade: 'São Paulo',
        uf: 'SP',
        regiao: 'Sudeste',
        tipoCombustivel: 'Gasolina',
        valorLitro: 5.50,
        litros: 50,
        totalPago: 275,
        motorista: {
          nome: 'João Silva',
          cpf: '12345678901'
        },
        veiculo: {
          placa: 'ABC1234',
          modelo: 'Gol'
        }
      }
    ];

    jest.spyOn(apiService, 'get').mockReturnValue(of(mockAbastecimentos));

    service.getAbastecimentos().subscribe(result => {
      expect(result).toEqual(mockAbastecimentos);
      expect(apiService.get).toHaveBeenCalledWith('abastecimentos');
      done();
    });
  });

  it('should handle empty response', (done) => {
    jest.spyOn(apiService, 'get').mockReturnValue(of([]));

    service.getAbastecimentos().subscribe(result => {
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
      done();
    });
  });
});
