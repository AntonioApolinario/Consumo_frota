import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of, combineLatest } from 'rxjs';
import { ConsultaService } from '../services/consulta.service';
import { Abastecimento, FiltrosConsulta, PaginacaoConfig } from '../models/consulta.models';

@Injectable({
  providedIn: 'root'
})
export class ConsultaFacade {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private abastecimentosSubject = new BehaviorSubject<Abastecimento[]>([]);
  private filtrosSubject = new BehaviorSubject<FiltrosConsulta>({});
  private paginacaoSubject = new BehaviorSubject<PaginacaoConfig>({
    paginaAtual: 1,
    itensPorPagina: 10,
    totalItens: 0
  });

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  filtros$ = this.filtrosSubject.asObservable();
  paginacao$ = this.paginacaoSubject.asObservable();

  abastecimentosFiltrados$ = combineLatest([
    this.abastecimentosSubject,
    this.filtrosSubject,
    this.paginacaoSubject
  ]).pipe(
    map(([abastecimentos, filtros, paginacao]) => {
      let filtrados = this.aplicarFiltros(abastecimentos, filtros);
      
      const paginacaoAtualizada = {
        ...paginacao,
        totalItens: filtrados.length
      };
      this.paginacaoSubject.next(paginacaoAtualizada);

      const inicio = (paginacao.paginaAtual - 1) * paginacao.itensPorPagina;
      const fim = inicio + paginacao.itensPorPagina;
      
      return filtrados.slice(inicio, fim);
    })
  );

  constructor(private consultaService: ConsultaService) {}

  loadAbastecimentos(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.consultaService.getAbastecimentos().pipe(
      catchError(error => {
        this.errorSubject.next('Erro ao carregar abastecimentos');
        return of([]);
      })
    ).subscribe(abastecimentos => {
      this.abastecimentosSubject.next(abastecimentos);
      this.loadingSubject.next(false);
    });
  }

  aplicarFiltro(filtros: FiltrosConsulta): void {
    this.filtrosSubject.next(filtros);
    this.mudarPagina(1);
  }

  mudarPagina(pagina: number): void {
    const paginacaoAtual = this.paginacaoSubject.value;
    this.paginacaoSubject.next({
      ...paginacaoAtual,
      paginaAtual: pagina
    });
  }

  private aplicarFiltros(abastecimentos: Abastecimento[], filtros: FiltrosConsulta): Abastecimento[] {
    return abastecimentos.filter(a => {
      // Filtro por UF (ignorar se vazio ou undefined)
      if (filtros.uf && filtros.uf.trim() !== '' && a.uf !== filtros.uf) {
        return false;
      }
      
      // Filtro por tipo de combustível (ignorar se vazio ou undefined)
      if (filtros.tipoCombustivel && filtros.tipoCombustivel.trim() !== '' && a.tipoCombustivel !== filtros.tipoCombustivel) {
        return false;
      }
      
      // Filtro por data inicial
      if (filtros.dataInicio && filtros.dataInicio.trim() !== '') {
        const dataAbastecimento = new Date(a.data);
        const dataInicio = new Date(filtros.dataInicio);
        dataInicio.setHours(0, 0, 0, 0);
        if (dataAbastecimento < dataInicio) {
          return false;
        }
      }
      
      // Filtro por data final
      if (filtros.dataFim && filtros.dataFim.trim() !== '') {
        const dataAbastecimento = new Date(a.data);
        const dataFim = new Date(filtros.dataFim);
        dataFim.setHours(23, 59, 59, 999);
        if (dataAbastecimento > dataFim) {
          return false;
        }
      }
      
      return true;
    });
  }
}
