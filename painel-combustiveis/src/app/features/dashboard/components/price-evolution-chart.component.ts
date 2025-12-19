import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-price-evolution-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-h3 font-semibold text-gov-blue mb-4">Evolução de Preço</h3>
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class PriceEvolutionChartComponent implements OnInit, OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];
  
  private chart: Chart | null = null;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
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
            data: [5.50, 5.65, 5.89, 5.75, 5.92, 5.89],
            borderColor: '#1351B4',
            backgroundColor: 'rgba(19, 81, 180, 0.1)',
            tension: 0.4
          },
          {
            label: 'Diesel',
            data: [6.10, 6.20, 6.25, 6.15, 6.30, 6.25],
            borderColor: '#168821',
            backgroundColor: 'rgba(22, 136, 33, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
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
                return 'R$ ' + value;
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
