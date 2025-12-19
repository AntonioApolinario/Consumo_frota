import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { KpiData, Abastecimento } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private kpiDataSubject = new BehaviorSubject<KpiData | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  kpiData$ = this.kpiDataSubject.asObservable();

  constructor(private dashboardService: DashboardService) {}

  loadDashboardData(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.dashboardService.getAbastecimentos().pipe(
      map(abastecimentos => this.calculateKpis(abastecimentos)),
      catchError(error => {
        this.errorSubject.next('Erro ao carregar dados do dashboard');
        return of(null);
      })
    ).subscribe(kpiData => {
      this.kpiDataSubject.next(kpiData);
      this.loadingSubject.next(false);
    });
  }

  private calculateKpis(abastecimentos: Abastecimento[]): KpiData {
    const gasolina = abastecimentos.filter(a => a.tipoCombustivel === 'Gasolina');
    const diesel = abastecimentos.filter(a => a.tipoCombustivel === 'Diesel');
    
    const precoMedioGasolina = gasolina.length > 0
      ? gasolina.reduce((sum, a) => sum + a.valorLitro, 0) / gasolina.length
      : 0;

    const precoMedioDiesel = diesel.length > 0
      ? diesel.reduce((sum, a) => sum + a.valorLitro, 0) / diesel.length
      : 0;

    const totalLitros = abastecimentos.reduce((sum, a) => sum + a.litros, 0);

    const postosUnicos = new Set(abastecimentos.map(a => a.posto));
    const quantidadePostos = postosUnicos.size;

    return {
      precoMedioGasolina,
      precoMedioDiesel,
      totalLitros,
      quantidadePostos
    };
  }
}
