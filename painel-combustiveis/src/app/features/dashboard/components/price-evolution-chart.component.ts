import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

type ViewMode = 'media' | 'maxima' | 'minima';
type ZoomLevel = 'months' | 'weeks';

@Component({
  selector: 'app-price-evolution-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-h3 font-semibold text-gov-blue">
          Evolução de Preço: <span class="text-xl font-medium text-gray-700">{{ getViewModeLabel() }}</span>
        </h3>
      </div>
      
      <p *ngIf="zoomLevel === 'weeks'" class="text-sm text-gray-600 mb-2 text-center font-semibold">
        {{ selectedMonthName }}
      </p>
      
      <!-- Botão superior -->
      <div class="flex justify-center mb-4">
        <button 
          *ngIf="currentView === 'media'"
          (click)="toggleView('maxima')"
          class="px-6 py-2 bg-gov-blue text-white rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
          Máxima
        </button>
        <button 
          *ngIf="currentView === 'minima'"
          (click)="toggleView('media')"
          class="px-6 py-2 bg-gov-blue text-white rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
          Média
        </button>
      </div>
      
      <!-- Canvas com animação -->
      <div class="relative overflow-hidden" 
           [class.slide-down]="isAnimating && animationDirection === 'down'" 
           [class.slide-up]="isAnimating && animationDirection === 'up'"
           (mouseleave)="onMouseLeave()">
        <canvas #chartCanvas></canvas>
      </div>
      
      <!-- Botão inferior -->
      <div class="flex justify-center mt-4">
        <button 
          *ngIf="currentView === 'media'"
          (click)="toggleView('minima')"
          class="px-6 py-2 bg-gov-green text-white rounded-lg hover:bg-green-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
          Mínima
        </button>
        <button 
          *ngIf="currentView === 'maxima'"
          (click)="toggleView('media')"
          class="px-6 py-2 bg-gov-green text-white rounded-lg hover:bg-green-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
          Média
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideDown {
      0% {
        transform: translateY(-100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideUp {
      0% {
        transform: translateY(100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .slide-down {
      animation: slideDown 0.6s ease-out;
    }
    
    .slide-up {
      animation: slideUp 0.6s ease-out;
    }
  `]
})
export class PriceEvolutionChartComponent implements OnInit, OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];
  
  private chart: Chart | null = null;
  currentView: ViewMode = 'media';
  zoomLevel: ZoomLevel = 'months';
  selectedMonthIndex: number = -1;
  selectedMonthName: string = '';
  isAnimating = false;
  animationDirection: 'down' | 'up' = 'down';
  
  private readonly monthLabels = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'];
  private readonly monthNumbers = [6, 7, 8, 9, 10, 11]; // Junho a Novembro
  
  private generateWeekLabels(monthIndex: number): string[] {
    const monthNumber = this.monthNumbers[monthIndex];
    const year = 2025;
    const weeks = [];
    
    // Gerar 4 segundas-feiras do mês (aproximadamente)
    const startDays = [1, 8, 15, 22]; // Dias aproximados de segunda-feira
    
    for (const day of startDays) {
      const date = `${day.toString().padStart(2, '0')}/${monthNumber.toString().padStart(2, '0')}`;
      weeks.push(date);
    }
    
    return weeks;
  }
  
  // Dados históricos para os diferentes modos (visão mensal)
  private readonly historicalData = {
    media: {
      gasolina: [5.50, 5.65, 5.89, 5.75, 5.92, 5.89],
      diesel: [6.10, 6.20, 6.25, 6.15, 6.30, 6.25],
      etanol: [4.20, 4.35, 4.50, 4.40, 4.55, 4.48]
    },
    maxima: {
      gasolina: [6.20, 6.35, 6.50, 6.45, 6.55, 6.48],
      diesel: [6.80, 6.90, 6.95, 6.85, 7.00, 6.95],
      etanol: [5.00, 5.15, 5.30, 5.25, 5.35, 5.28]
    },
    minima: {
      gasolina: [4.80, 4.95, 5.10, 5.05, 5.20, 5.15],
      diesel: [5.40, 5.50, 5.55, 5.45, 5.60, 5.55],
      etanol: [3.40, 3.55, 3.70, 3.60, 3.75, 3.68]
    }
  };

  // Dados diários para cada mês (simulando 4 semanas)
  private generateWeeklyData(monthIndex: number, mode: ViewMode): any {
    const baseGasolina = this.historicalData[mode].gasolina[monthIndex];
    const baseDiesel = this.historicalData[mode].diesel[monthIndex];
    const baseEtanol = this.historicalData[mode].etanol[monthIndex];
    
    const weeks = 4;
    const gasolina = [];
    const diesel = [];
    const etanol = [];
    
    for (let i = 1; i <= weeks; i++) {
      // Variação aleatória de ±5% do valor base
      const variation = (Math.random() - 0.5) * 0.1;
      gasolina.push(+(baseGasolina * (1 + variation)).toFixed(2));
      diesel.push(+(baseDiesel * (1 + variation)).toFixed(2));
      etanol.push(+(baseEtanol * (1 + variation)).toFixed(2));
    }
    
    return { gasolina, diesel, etanol };
  }

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  getViewModeLabel(): string {
    const labels = {
      'media': 'Média',
      'maxima': 'Máxima',
      'minima': 'Mínima'
    };
    return labels[this.currentView];
  }

  toggleView(mode: ViewMode): void {
    if (mode === this.currentView) return;
    
    // Definir direção da animação
    if (mode === 'maxima') {
      this.animationDirection = 'down'; // Cai de cima para baixo
    } else if (mode === 'minima') {
      this.animationDirection = 'up'; // Sobe de baixo para cima
    } else {
      // Média: baseado no estado anterior
      this.animationDirection = this.currentView === 'maxima' ? 'up' : 'down';
    }
    
    this.isAnimating = true;
    this.currentView = mode;
    
    // Atualizar dados do gráfico baseado no nível de zoom
    if (this.chart) {
      if (this.zoomLevel === 'months') {
        const newData = this.historicalData[mode];
        this.chart.data.datasets[0].data = newData.gasolina;
        this.chart.data.datasets[1].data = newData.diesel;
        this.chart.data.datasets[2].data = newData.etanol;
      } else {
        // Visão de semanas
        const weeklyData = this.generateWeeklyData(this.selectedMonthIndex, mode);
        this.chart.data.datasets[0].data = weeklyData.gasolina;
        this.chart.data.datasets[1].data = weeklyData.diesel;
        this.chart.data.datasets[2].data = weeklyData.etanol;
      }
      this.chart.update('active');
    }
    
    // Remover classe de animação após completar
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  onMouseLeave(): void {
    if (this.zoomLevel === 'weeks') {
      this.zoomOut();
    }
  }

  zoomIn(monthIndex: number): void {
    this.selectedMonthIndex = monthIndex;
    this.selectedMonthName = this.monthLabels[monthIndex];
    this.zoomLevel = 'weeks';
    
    if (this.chart) {
      // Gerar labels com datas de segunda-feira
      const weekLabels = this.generateWeekLabels(monthIndex);
      this.chart.data.labels = weekLabels;
      
      // Atualizar dados
      const weeklyData = this.generateWeeklyData(monthIndex, this.currentView);
      this.chart.data.datasets[0].data = weeklyData.gasolina;
      this.chart.data.datasets[1].data = weeklyData.diesel;
      this.chart.data.datasets[2].data = weeklyData.etanol;
      
      this.chart.update('active');
    }
  }

  zoomOut(): void {
    this.zoomLevel = 'months';
    this.selectedMonthIndex = -1;
    
    if (this.chart) {
      // Restaurar labels dos meses
      this.chart.data.labels = this.monthLabels;
      
      // Restaurar dados mensais
      const monthlyData = this.historicalData[this.currentView];
      this.chart.data.datasets[0].data = monthlyData.gasolina;
      this.chart.data.datasets[1].data = monthlyData.diesel;
      this.chart.data.datasets[2].data = monthlyData.etanol;
      
      this.chart.update('active');
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.monthLabels,
        datasets: [
          {
            label: 'Gasolina',
            data: this.historicalData.media.gasolina,
            borderColor: '#1351B4',
            backgroundColor: '#1351B4',
            tension: 0.4,
            fill: false,
            borderWidth: 2
          },
          {
            label: 'Diesel',
            data: this.historicalData.media.diesel,
            borderColor: '#168821',
            backgroundColor: '#168821',
            tension: 0.4,
            fill: false,
            borderWidth: 2
          },
          {
            label: 'Etanol',
            data: this.historicalData.media.etanol,
            borderColor: '#F58220',
            backgroundColor: '#F58220',
            tension: 0.4,
            fill: false,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        },
        onClick: (event, elements) => {
          if (this.zoomLevel === 'months') {
            const canvasElement = this.chart?.canvas;
            if (!canvasElement) return;
            
            const rect = canvasElement.getBoundingClientRect();
            const x = (event as any).x || (event as any).clientX;
            const relativeX = x - rect.left;
            
            // Calcular qual mês foi clicado baseado na posição X
            const chartWidth = rect.width;
            const clickPercent = relativeX / chartWidth;
            const monthIndex = Math.floor(clickPercent * this.monthLabels.length);
            
            if (monthIndex >= 0 && monthIndex < this.monthLabels.length) {
              this.zoomIn(monthIndex);
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: 15
            }
          },
          title: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                if (this.zoomLevel === 'months') {
                  return context[0].label + ' (Clique para ver semanas)';
                }
                return context[0].label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'R$ ' + Number(value).toFixed(2);
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart && this.data.length > 0) {
      this.chart.update();
    }
  }
}
