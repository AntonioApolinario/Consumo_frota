import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { ApiService } from '../../../core';
import { of } from 'rxjs';
import { Abastecimento } from '../models/dashboard.models';

describe('DashboardService', () => {
  let service: DashboardService;
  let apiService: ApiService;

  beforeEach(() => {
    const apiServiceMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(DashboardService);
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
        valorLitro: 5.01,
        litros: 50,
        totalPago: 250.50,
        motorista: { nome: 'João', cpf: '12345678901' },
        veiculo: { placa: 'ABC1234', modelo: 'Gol' }
      }
    ];

    jest.spyOn(apiService, 'get').mockReturnValue(of(mockAbastecimentos));

    service.getAbastecimentos().subscribe(result => {
      expect(result).toEqual(mockAbastecimentos);
      expect(apiService.get).toHaveBeenCalledWith('abastecimentos');
      done();
    });
  });

  it('should calculate chart data for regions', () => {
    const abastecimentos: Abastecimento[] = [
      {
        id: 1, data: '2024-01-15', posto: 'BR', cidade: 'São Paulo',
        uf: 'SP', regiao: 'Sudeste', tipoCombustivel: 'Gasolina',
        valorLitro: 5, litros: 100, totalPago: 500,
        motorista: { nome: 'João', cpf: '123' },
        veiculo: { placa: 'ABC1234', modelo: 'Gol' }
      },
      {
        id: 2, data: '2024-01-16', posto: 'Shell', cidade: 'Rio de Janeiro',
        uf: 'RJ', regiao: 'Sudeste', tipoCombustivel: 'Etanol',
        valorLitro: 4, litros: 200, totalPago: 800,
        motorista: { nome: 'Maria', cpf: '456' },
        veiculo: { placa: 'DEF5678', modelo: 'Fox' }
      }
    ];

    const level = { type: 'regiao' as const, value: 'Brasil' };
    const result = service.calculateChartData(abastecimentos, level);

    expect(result.length).toBe(1);
    expect(result[0].label).toBe('Sudeste');
    expect(result[0].value).toBe(300);
    expect(result[0].percentage).toBe(100);
  });

  it('should calculate chart data for states', () => {
    const abastecimentos: Abastecimento[] = [
      {
        id: 1, data: '2024-01-15', posto: 'BR', cidade: 'São Paulo',
        uf: 'SP', regiao: 'Sudeste', tipoCombustivel: 'Gasolina',
        valorLitro: 5, litros: 150, totalPago: 750,
        motorista: { nome: 'João', cpf: '123' },
        veiculo: { placa: 'ABC1234', modelo: 'Gol' }
      },
      {
        id: 2, data: '2024-01-16', posto: 'Shell', cidade: 'Rio de Janeiro',
        uf: 'RJ', regiao: 'Sudeste', tipoCombustivel: 'Etanol',
        valorLitro: 4, litros: 100, totalPago: 400,
        motorista: { nome: 'Maria', cpf: '456' },
        veiculo: { placa: 'DEF5678', modelo: 'Fox' }
      }
    ];

    const level = { type: 'estado' as const, value: 'Sudeste' };
    const result = service.calculateChartData(abastecimentos, level);

    expect(result.length).toBe(2);
    expect(result[0].label).toBe('SP');
    expect(result[0].value).toBe(150);
    expect(result[1].label).toBe('RJ');
    expect(result[1].value).toBe(100);
  });

  it('should sort data by consumption descending', () => {
    const abastecimentos: Abastecimento[] = [
      {
        id: 1, data: '2024-01-15', posto: 'BR', cidade: 'São Paulo',
        uf: 'SP', regiao: 'Sudeste', tipoCombustivel: 'Gasolina',
        valorLitro: 5, litros: 50, totalPago: 250,
        motorista: { nome: 'João', cpf: '123' },
        veiculo: { placa: 'ABC1234', modelo: 'Gol' }
      },
      {
        id: 2, data: '2024-01-16', posto: 'Shell', cidade: 'Rio',
        uf: 'RJ', regiao: 'Sudeste', tipoCombustivel: 'Etanol',
        valorLitro: 4, litros: 200, totalPago: 800,
        motorista: { nome: 'Maria', cpf: '456' },
        veiculo: { placa: 'DEF5678', modelo: 'Fox' }
      },
      {
        id: 3, data: '2024-01-17', posto: 'Ipiranga', cidade: 'BH',
        uf: 'MG', regiao: 'Sudeste', tipoCombustivel: 'Diesel',
        valorLitro: 4.5, litros: 100, totalPago: 450,
        motorista: { nome: 'Pedro', cpf: '789' },
        veiculo: { placa: 'GHI9012', modelo: 'Uno' }
      }
    ];

    const level = { type: 'estado' as const, value: 'Sudeste' };
    const result = service.calculateChartData(abastecimentos, level);

    expect(result[0].label).toBe('RJ');
    expect(result[0].value).toBe(200);
    expect(result[1].label).toBe('MG');
    expect(result[1].value).toBe(100);
    expect(result[2].label).toBe('SP');
    expect(result[2].value).toBe(50);
  });

  it('should return empty array when no data', () => {
    const level = { type: 'regiao' as const, value: 'Brasil' };
    const result = service.calculateChartData([], level);

    expect(result).toEqual([]);
  });
});
