import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoConfig } from '../models/consulta.models';

@Component({
  selector: 'app-paginacao',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-md">
      <div class="text-sm text-gov-gray-8">
        Mostrando {{ inicio }} a {{ fim }} de {{ config.totalItens }} registros
      </div>

      <div class="flex gap-2">
        <button 
          (click)="anterior()"
          [disabled]="config.paginaAtual === 1"
          [class.opacity-50]="config.paginaAtual === 1"
          [class.cursor-not-allowed]="config.paginaAtual === 1"
          class="px-4 py-2 bg-gov-blue text-white rounded hover:bg-gov-blue-warm transition-colors disabled:hover:bg-gov-blue">
          Anterior
        </button>

        <div class="flex items-center px-4 text-gov-gray-2">
          Página {{ config.paginaAtual }} de {{ totalPaginas }}
        </div>

        <button 
          (click)="proxima()"
          [disabled]="config.paginaAtual >= totalPaginas"
          [class.opacity-50]="config.paginaAtual >= totalPaginas"
          [class.cursor-not-allowed]="config.paginaAtual >= totalPaginas"
          class="px-4 py-2 bg-gov-blue text-white rounded hover:bg-gov-blue-warm transition-colors disabled:hover:bg-gov-blue">
          Próxima
        </button>
      </div>
    </div>
  `
})
export class PaginacaoComponent {
  @Input() config: PaginacaoConfig = {
    paginaAtual: 1,
    itensPorPagina: 10,
    totalItens: 0
  };
  @Output() paginaChange = new EventEmitter<number>();

  get totalPaginas(): number {
    return Math.ceil(this.config.totalItens / this.config.itensPorPagina) || 1;
  }

  get inicio(): number {
    return (this.config.paginaAtual - 1) * this.config.itensPorPagina + 1;
  }

  get fim(): number {
    return Math.min(this.config.paginaAtual * this.config.itensPorPagina, this.config.totalItens);
  }

  anterior(): void {
    if (this.config.paginaAtual > 1) {
      this.paginaChange.emit(this.config.paginaAtual - 1);
    }
  }

  proxima(): void {
    if (this.config.paginaAtual < this.totalPaginas) {
      this.paginaChange.emit(this.config.paginaAtual + 1);
    }
  }
}
