import { TestBed } from '@angular/core/testing';
import { DashboardFacade } from './dashboard.facade';
import { DashboardService } from '../services/dashboard.service';
import { of, throwError } from 'rxjs';
import { Abastecimento, ChartDataPoint } from '../models/dashboard.models';

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let dashboardService: DashboardService;

  const mockAbastecimentos: Abastecimento[] = [
    {
      id: 1, data: '2024-01-15', posto: 'BR', cidade: 'São Paulo',
      uf: 'SP', regiao: 'Sudeste', tipoCombustivel: 'Gasolina',
      valorLitro: 5.50, litros: 100, totalPago: 550,
      motorista: { nome: 'João', cpf: '12345678901' },
      veiculo: { placa: 'ABC1234', modelo: 'Gol' }
    },
    {
      id: 2, data: '2024-01-16', posto: 'Shell', cidade: 'Rio de Janeiro',
      uf: 'RJ', regiao: 'Sudeste', tipoCombustivel: 'Etanol',
      valorLitro: 4.20, litros: 80, totalPago: 336,
      motorista: { nome: 'Maria', cpf: '98765432100' },
      veiculo: { placa: 'DEF5678', modelo: 'Fox' }
    }
  ];

  beforeEach(() => {
    const dashboardServiceMock = {
      getAbastecimentos: jest.fn(),
      calculateChartData: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        DashboardFacade,
        { provide: DashboardService, useValue: dashboardServiceMock }
      ]
    });

    facade = TestBed.inject(DashboardFacade);
    dashboardService = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should load dashboard data', (done) => {
    const mockChartData: ChartDataPoint[] = [
      {
        label: 'Sudeste',
        value: 180,
        percentage: 100,
        isOthers: false,
        level: { type: 'estado', value: 'Sudeste' }
      }
    ];

    jest.spyOn(dashboardService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));
    jest.spyOn(dashboardService, 'calculateChartData').mockReturnValue(mockChartData);

    facade.loadDashboardData();

    facade.kpiData$.subscribe(kpiData => {
      if (kpiData) {
        expect(kpiData).toBeTruthy();
        expect(dashboardService.getAbastecimentos).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should perform drill down', (done) => {
    const mockChartData: ChartDataPoint[] = [
      {
        label: 'SP',
        value: 100,
        percentage: 55.56,
        isOthers: false,
        level: { type: 'municipio', value: 'SP', parent: 'Sudeste' }
      }
    ];

    const dataPoint: ChartDataPoint = {
      label: 'Sudeste',
      value: 180,
      percentage: 100,
      isOthers: false,
      level: { type: 'estado', value: 'Sudeste' }
    };

    jest.spyOn(dashboardService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));
    jest.spyOn(dashboardService, 'calculateChartData').mockReturnValue(mockChartData);

    facade.loadDashboardData();
    
    setTimeout(() => {
      facade.drillDown(dataPoint);
      
      facade.currentLevel$.subscribe(level => {
        if (level.type === 'estado') {
          expect(level.value).toBe('Sudeste');
          done();
        }
      });
    }, 100);
  });

  it('should perform drill up', (done) => {
    jest.spyOn(dashboardService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));
    jest.spyOn(dashboardService, 'calculateChartData').mockReturnValue([]);

    facade.loadDashboardData();
    
    setTimeout(() => {
      facade.drillUp();
      
      facade.currentLevel$.subscribe(level => {
        expect(level).toBeTruthy();
        done();
      });
    }, 100);
  });

  it('should handle errors when loading data', (done) => {
    jest.spyOn(dashboardService, 'getAbastecimentos')
      .mockReturnValue(throwError(() => new Error('API Error')));

    facade.loadDashboardData();

    facade.error$.subscribe(error => {
      if (error) {
        expect(error).toBe('Erro ao carregar dados do dashboard');
        done();
      }
    });
  });
});
