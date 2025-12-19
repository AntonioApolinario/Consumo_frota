import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { DashboardFacade } from '../facades/dashboard.facade';
import { ChartDataPoint, DrillDownLevel } from '../models/dashboard.models';

Chart.register(...registerables);

@Component({
  selector: 'app-region-consumption-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-h3 font-semibold text-gov-blue">{{ getTitle() }}</h3>
        <div class="flex gap-2">
          <button
            *ngIf="canDrillUp()"
            (click)="onDrillUp()"
            class="px-3 py-1 text-sm bg-gov-blue-warm text-white rounded hover:bg-gov-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gov-blue"
            aria-label="Voltar ao nível anterior"
          >
            ← Voltar
          </button>
          <button
            *ngIf="currentLevel && currentLevel.type !== 'regiao'"
            (click)="onReset()"
            class="px-3 py-1 text-sm bg-gov-gray-20 text-gov-blue rounded hover:bg-gov-gray-10 transition-colors focus:outline-none focus:ring-2 focus:ring-gov-blue"
            aria-label="Voltar para regiões"
          >
            ↺ Resetar
          </button>
        </div>
      </div>
      <div class="text-sm text-gov-gray-60 mb-2" *ngIf="getBreadcrumb()">
        {{ getBreadcrumb() }}
      </div>
      <canvas 
        #chartCanvas 
        role="img" 
        [attr.aria-label]="'Gráfico de consumo por ' + getLevelName()"
        style="cursor: pointer;"
      ></canvas>
      <div class="mt-4 text-sm text-gov-gray-60">
        <p class="mb-1">
          <span class="inline-block w-3 h-3 bg-gov-green mr-2"></span>
          Clique nas barras para explorar os dados detalhadamente
        </p>
        <p class="italic">
          As barras coloridas representam os itens que consomem 50% do total. 
          A barra "Outros" agrupa os 50% restantes e também é clicável.
        </p>
      </div>
    </div>
  `
})
export class RegionConsumptionChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;
  private chartDataSubscription?: Subscription;
  private levelSubscription?: Subscription;
  private chartData: ChartDataPoint[] = [];
  currentLevel: DrillDownLevel | null = null;

  constructor(private facade: DashboardFacade) {}

  ngOnInit(): void {
    this.chartDataSubscription = this.facade.chartData$.subscribe(data => {
      this.chartData = data;
      if (this.chart) {
        this.updateChart();
      } else {
        this.createChart();
      }
    });

    this.levelSubscription = this.facade.currentLevel$.subscribe(level => {
      this.currentLevel = level;
    });
  }

  ngOnDestroy(): void {
    this.chartDataSubscription?.unsubscribe();
    this.levelSubscription?.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.chartData.map(d => d.label);
    const values = this.chartData.map(d => d.value);
    const colors = this.chartData.map((d, index) => 
      d.isOthers ? '#CCCCCC' : this.getColorForIndex(index)
    );

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Litros Consumidos',
            data: values,
            backgroundColor: colors,
            borderWidth: 0,
            hoverBackgroundColor: colors.map(c => this.lightenColor(c))
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const dataPoint = this.chartData[index];
            this.onBarClick(dataPoint);
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (value === null || value === undefined) return '';
                
                const dataPoint = this.chartData[context.dataIndex];
                return [
                  `Consumo: ${value.toFixed(1)}L`,
                  `Percentual: ${dataPoint.percentage.toFixed(1)}%`,
                  dataPoint.isOthers ? '(Clique para expandir)' : '(Clique para detalhar)'
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + 'L';
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              },
              maxRotation: 45,
              minRotation: 0
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (!this.chart) return;

    const labels = this.chartData.map(d => d.label);
    const values = this.chartData.map(d => d.value);
    const colors = this.chartData.map((d, index) => 
      d.isOthers ? '#CCCCCC' : this.getColorForIndex(index)
    );

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = values;
    this.chart.data.datasets[0].backgroundColor = colors;
    this.chart.data.datasets[0].hoverBackgroundColor = colors.map(c => this.lightenColor(c));
    this.chart.update();
  }

  private onBarClick(dataPoint: ChartDataPoint): void {
    this.facade.drillDown(dataPoint);
  }

  onDrillUp(): void {
    this.facade.drillUp();
  }

  onReset(): void {
    this.facade.resetView();
  }

  canDrillUp(): boolean {
    return this.currentLevel !== null && this.currentLevel.type !== 'regiao';
  }

  getTitle(): string {
    if (!this.currentLevel) return 'Consumo por Região';
    
    switch (this.currentLevel.type) {
      case 'regiao':
        return 'Consumo por Região';
      case 'estado':
        return `Estados da Região ${this.currentLevel.parent || ''}`;
      case 'municipio':
        return `Municípios do Estado ${this.currentLevel.parent || ''}`;
      default:
        return 'Consumo de Combustível';
    }
  }

  getLevelName(): string {
    if (!this.currentLevel) return 'região';
    
    switch (this.currentLevel.type) {
      case 'regiao':
        return 'região';
      case 'estado':
        return 'estado';
      case 'municipio':
        return 'município';
      default:
        return 'nível';
    }
  }

  getBreadcrumb(): string {
    if (!this.currentLevel) return '';
    
    if (this.currentLevel.type === 'regiao') {
      return 'Brasil';
    } else if (this.currentLevel.type === 'estado') {
      return `Brasil > ${this.currentLevel.parent}`;
    } else if (this.currentLevel.type === 'municipio') {
      return `Brasil > Região > ${this.currentLevel.parent}`;
    }
    
    return '';
  }

  private getColorForIndex(index: number): string {
    const colors = [
      '#1351B4', // Gov Blue
      '#168821', // Gov Green
      '#FFCD07', // Gov Yellow
      '#155BCB', // Blue Warm
      '#1B4B99', // Blue Dark
      '#2670E8', // Blue Vivid
      '#0C326F', // Blue Navy
      '#C5D4EB'  // Blue Light
    ];
    return colors[index % colors.length];
  }

  private lightenColor(color: string): string {
    // Converter hex para RGB e clarear
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const lighten = 30;
    const newR = Math.min(255, r + lighten);
    const newG = Math.min(255, g + lighten);
    const newB = Math.min(255, b + lighten);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
}

