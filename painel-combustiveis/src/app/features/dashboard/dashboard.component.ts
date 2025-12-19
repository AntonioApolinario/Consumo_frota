import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from './facades/dashboard.facade';
import { KpiCardComponent } from './components/kpi-card.component';
import { LoadingSpinnerComponent, ErrorMessageComponent } from '../../shared';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    KpiCardComponent, 
    LoadingSpinnerComponent, 
    ErrorMessageComponent
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-h1 font-bold text-gov-gray-2">Dashboard</h1>
        <p class="text-gov-gray-8 mt-2">Visão geral dos dados de combustíveis da frota nacional.</p>
      </div>

      <app-loading-spinner *ngIf="facade.loading$ | async"></app-loading-spinner>

      <app-error-message 
        *ngIf="facade.error$ | async as error"
        [message]="error">
      </app-error-message>

      <div *ngIf="facade.kpiData$ | async as kpiData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-kpi-card
          title="Preço Médio - Gasolina"
          [value]="'R$ ' + kpiData.precoMedioGasolina.toFixed(2)"
          subtitle="Média nacional"
          icon="⛽"
          color="blue">
        </app-kpi-card>

        <app-kpi-card
          title="Preço Médio - Diesel"
          [value]="'R$ ' + kpiData.precoMedioDiesel.toFixed(2)"
          subtitle="Média nacional"
          icon="🚚"
          color="green">
        </app-kpi-card>

        <app-kpi-card
          title="Total de Litros"
          [value]="kpiData.totalLitros.toLocaleString('pt-BR') + 'L'"
          subtitle="Consumidos"
          icon="📊"
          color="yellow">
        </app-kpi-card>

        <app-kpi-card
          title="Postos Monitorados"
          [value]="kpiData.quantidadePostos.toString()"
          subtitle="Em todo Brasil"
          icon="📍"
          color="blue">
        </app-kpi-card>
      </div>

      <div *ngIf="facade.kpiData$ | async" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-h3 font-semibold text-gov-blue mb-4">Gráficos</h2>
        <p class="text-gov-gray-8">Gráficos de evolução e consumo por região serão implementados na próxima etapa.</p>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  constructor(public facade: DashboardFacade) {}

  ngOnInit(): void {
    this.facade.loadDashboardData();
  }
}
