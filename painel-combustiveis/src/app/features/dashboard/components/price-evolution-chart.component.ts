import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

type ViewMode = 'media' | 'maxima' | 'minima';

@Component({
  selector: 'app-price-evolution-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-h3 font-semibold text-gov-blue mb-4">Evolução de Preço</h3>
      
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
      <div class="relative overflow-hidden" [class.slide-down]="isAnimating && animationDirection === 'down'" [class.slide-up]="isAnimating && animationDirection === 'up'">
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
  isAnimating = false;
  animationDirection: 'down' | 'up' = 'down';
  
  // Dados históricos para os diferentes modos
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

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
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
    
    // Atualizar dados do gráfico
    if (this.chart) {
      const newData = this.historicalData[mode];
      this.chart.data.datasets[0].data = newData.gasolina;
      this.chart.data.datasets[1].data = newData.diesel;
      this.chart.data.datasets[2].data = newData.etanol;
      this.chart.update('active');
    }
    
    // Remover classe de animação após completar
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
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
