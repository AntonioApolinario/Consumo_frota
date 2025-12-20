import { TestBed } from '@angular/core/testing';
import { ConsultaFacade } from './consulta.facade';
import { ConsultaService } from '../services/consulta.service';
import { of, throwError } from 'rxjs';
import { Abastecimento } from '../models/consulta.models';

describe('ConsultaFacade', () => {
  let facade: ConsultaFacade;
  let consultaService: ConsultaService;

  const mockAbastecimentos: Abastecimento[] = [
    {
      id: 1, data: '2024-01-15', posto: 'BR', cidade: 'São Paulo',
      uf: 'SP', regiao: 'Sudeste', tipoCombustivel: 'Gasolina',
      valorLitro: 5.50, litros: 50, totalPago: 275,
      motorista: { nome: 'João Silva', cpf: '12345678901' },
      veiculo: { placa: 'ABC1234', modelo: 'Gol' }
    },
    {
      id: 2, data: '2024-01-16', posto: 'Shell', cidade: 'Rio de Janeiro',
      uf: 'RJ', regiao: 'Sudeste', tipoCombustivel: 'Etanol',
      valorLitro: 4.20, litros: 40, totalPago: 168,
      motorista: { nome: 'Maria Santos', cpf: '98765432100' },
      veiculo: { placa: 'DEF5678', modelo: 'Fox' }
    }
  ];

  beforeEach(() => {
    const consultaServiceMock = {
      getAbastecimentos: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ConsultaFacade,
        { provide: ConsultaService, useValue: consultaServiceMock }
      ]
    });

    facade = TestBed.inject(ConsultaFacade);
    consultaService = TestBed.inject(ConsultaService);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should load abastecimentos', (done) => {
    jest.spyOn(consultaService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));

    facade.loadAbastecimentos();

    facade.loading$.subscribe(loading => {
      if (!loading) {
        expect(consultaService.getAbastecimentos).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should apply filters', (done) => {
    jest.spyOn(consultaService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));
    
    facade.loadAbastecimentos();
    
    setTimeout(() => {
      facade.aplicarFiltro({ uf: 'SP' });
      
      facade.abastecimentosFiltrados$.subscribe(filtrados => {
        if (filtrados.length > 0) {
          expect(filtrados[0].uf).toBe('SP');
          done();
        }
      });
    }, 100);
  });

  it('should change page', (done) => {
    jest.spyOn(consultaService, 'getAbastecimentos').mockReturnValue(of(mockAbastecimentos));
    
    facade.loadAbastecimentos();
    facade.mudarPagina(2);
    
    facade.paginacao$.subscribe(paginacao => {
      if (paginacao.paginaAtual === 2) {
        expect(paginacao.paginaAtual).toBe(2);
        done();
      }
    });
  });

  it('should handle errors', (done) => {
    jest.spyOn(consultaService, 'getAbastecimentos')
      .mockReturnValue(throwError(() => new Error('API Error')));
    
    facade.loadAbastecimentos();
    
    facade.error$.subscribe(error => {
      if (error) {
        expect(error).toBeTruthy();
        done();
      }
    });
  });
});
