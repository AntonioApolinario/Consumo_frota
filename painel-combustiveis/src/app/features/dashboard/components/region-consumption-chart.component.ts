import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-region-consumption-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-h3 font-semibold text-gov-blue mb-4">Consumo por Região</h3>
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class RegionConsumptionChartComponent implements OnInit, OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: { uf: string, total: number }[] = [];
  
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

    const ufs = this.data.length > 0 
      ? this.data.map(d => d.uf)
      : ['DF', 'SP', 'RJ', 'MG', 'RS'];
    
    const totais = this.data.length > 0
      ? this.data.map(d => d.total)
      : [125.5, 280.0, 190.5, 160.0, 145.0];

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ufs,
        datasets: [
          {
            label: 'Litros Consumidos',
            data: totais,
            backgroundColor: [
              '#1351B4',
              '#155BCB',
              '#168821',
              '#FFCD07',
              '#1B4B99'
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
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
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart && this.data.length > 0) {
      const ufs = this.data.map(d => d.uf);
      const totais = this.data.map(d => d.total);
      
      this.chart.data.labels = ufs;
      this.chart.data.datasets[0].data = totais;
      this.chart.update();
    }
  }
}
