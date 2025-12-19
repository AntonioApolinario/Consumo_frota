import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { KpiData, Abastecimento, ChartDataPoint, DrillDownLevel } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private kpiDataSubject = new BehaviorSubject<KpiData | null>(null);
  private abastecimentosSubject = new BehaviorSubject<Abastecimento[]>([]);
  private chartDataSubject = new BehaviorSubject<ChartDataPoint[]>([]);
  private currentLevelSubject = new BehaviorSubject<DrillDownLevel>({ type: 'regiao', value: 'Brasil' });

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  kpiData$ = this.kpiDataSubject.asObservable();
  chartData$ = this.chartDataSubject.asObservable();
  currentLevel$ = this.currentLevelSubject.asObservable();

  constructor(private dashboardService: DashboardService) {}

  loadDashboardData(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.dashboardService.getAbastecimentos().pipe(
      map(abastecimentos => {
        this.abastecimentosSubject.next(abastecimentos);
        
        // Calcular KPIs
        const kpis = this.calculateKpis(abastecimentos);
        
        // Calcular dados do gráfico inicial (regiões)
        const initialLevel: DrillDownLevel = { type: 'regiao', value: 'Brasil' };
        const chartData = this.dashboardService.calculateChartData(abastecimentos, initialLevel);
        
        return { kpis, chartData };
      }),
      catchError(error => {
        this.errorSubject.next('Erro ao carregar dados do dashboard');
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.kpiDataSubject.next(data.kpis);
        this.chartDataSubject.next(data.chartData);
        this.currentLevelSubject.next({ type: 'regiao', value: 'Brasil' });
      }
      this.loadingSubject.next(false);
    });
  }

  /**
   * Drill-down para o próximo nível
   */
  drillDown(dataPoint: ChartDataPoint): void {
    const abastecimentos = this.abastecimentosSubject.value;
    
    if (dataPoint.isOthers && dataPoint.level.excludedItems) {
      // Clicou em "Outros": expandir recursivamente os 50% restantes
      const excludedItems = dataPoint.level.excludedItems;
      const chartData = this.dashboardService.calculateChartData(
        abastecimentos, 
        dataPoint.level,
        excludedItems
      );
      this.chartDataSubject.next(chartData);
      // Mantém o mesmo nível mas com lista atualizada de excluídos
      this.currentLevelSubject.next({
        ...dataPoint.level,
        excludedItems: excludedItems
      });
    } else {
      // Drill-down normal para o próximo nível
      const chartData = this.dashboardService.calculateChartData(abastecimentos, dataPoint.level);
      this.chartDataSubject.next(chartData);
      this.currentLevelSubject.next(dataPoint.level);
    }
  }

  /**
   * Volta para o nível anterior
   */
  drillUp(): void {
    const currentLevel = this.currentLevelSubject.value;
    const abastecimentos = this.abastecimentosSubject.value;
    
    // Se estamos em uma visualização de "Outros" expandida, voltar para a visualização completa
    if (currentLevel.excludedItems && currentLevel.excludedItems.length > 0) {
      const chartData = this.dashboardService.calculateChartData(abastecimentos, currentLevel, []);
      this.chartDataSubject.next(chartData);
      this.currentLevelSubject.next({
        ...currentLevel,
        excludedItems: []
      });
      return;
    }
    
    let previousLevel: DrillDownLevel;
    
    if (currentLevel.type === 'municipio' && currentLevel.parent) {
      // Voltar de município para estado
      previousLevel = { type: 'estado', value: currentLevel.parent };
    } else if (currentLevel.type === 'estado' && currentLevel.parent) {
      // Voltar de estado para região  
      previousLevel = { type: 'regiao', value: 'Brasil' };
    } else {
      // Já está no nível raiz
      return;
    }
    
    const chartData = this.dashboardService.calculateChartData(abastecimentos, previousLevel);
    this.chartDataSubject.next(chartData);
    this.currentLevelSubject.next(previousLevel);
  }

  /**
   * Reseta para a visualização inicial (regiões)
   */
  resetView(): void {
    const abastecimentos = this.abastecimentosSubject.value;
    const initialLevel: DrillDownLevel = { type: 'regiao', value: 'Brasil' };
    const chartData = this.dashboardService.calculateChartData(abastecimentos, initialLevel);
    
    this.chartDataSubject.next(chartData);
    this.currentLevelSubject.next(initialLevel);
  }

  private handleOthersDrillDown(dataPoint: ChartDataPoint): void {
    // Método removido - lógica agora está em drillDown()
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
