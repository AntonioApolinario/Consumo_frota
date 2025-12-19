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
      if (filtros.uf && a.uf !== filtros.uf) return false;
      if (filtros.tipoCombustivel && a.tipoCombustivel !== filtros.tipoCombustivel) return false;
      if (filtros.dataInicio && new Date(a.data) < new Date(filtros.dataInicio)) return false;
      if (filtros.dataFim && new Date(a.data) > new Date(filtros.dataFim)) return false;
      return true;
    });
  }
}
