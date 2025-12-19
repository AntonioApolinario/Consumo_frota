import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosConsulta } from '../models/consulta.models';
import { ESTADOS_BRASILEIROS, TipoCombustivel } from '../../../core/models/enums';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-h3 font-semibold text-gov-blue mb-4">Filtros</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gov-gray-8 mb-2">Estado</label>
          <select 
            [(ngModel)]="filtros.uf"
            (change)="aplicar()"
            class="w-full px-3 py-2 border border-gov-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-gov-blue">
            <option value="">Todos</option>
            <option *ngFor="let estado of estados" [value]="estado.sigla">
              {{ estado.sigla }} - {{ estado.nome }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gov-gray-8 mb-2">Combustível</label>
          <select 
            [(ngModel)]="filtros.tipoCombustivel"
            (change)="aplicar()"
            class="w-full px-3 py-2 border border-gov-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-gov-blue">
            <option value="">Todos</option>
            <option *ngFor="let tipo of tiposCombustivel" [value]="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gov-gray-8 mb-2">Data Início</label>
          <input 
            type="date"
            [(ngModel)]="filtros.dataInicio"
            (change)="aplicar()"
            class="w-full px-3 py-2 border border-gov-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-gov-blue">
        </div>

        <div>
          <label class="block text-sm font-medium text-gov-gray-8 mb-2">Data Fim</label>
          <input 
            type="date"
            [(ngModel)]="filtros.dataFim"
            (change)="aplicar()"
            class="w-full px-3 py-2 border border-gov-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-gov-blue">
        </div>
      </div>

      <div class="mt-4 flex gap-2">
        <button 
          (click)="limpar()"
          class="px-4 py-2 bg-gov-gray-20 text-gov-gray-2 rounded hover:bg-gov-gray-8 hover:text-white transition-colors">
          Limpar Filtros
        </button>
      </div>
    </div>
  `
})
export class FiltrosComponent {
  @Output() filtrosChange = new EventEmitter<FiltrosConsulta>();

  filtros: FiltrosConsulta = {};
  estados = ESTADOS_BRASILEIROS;
  tiposCombustivel = Object.values(TipoCombustivel);

  aplicar(): void {
    this.filtrosChange.emit(this.filtros);
  }

  limpar(): void {
    this.filtros = {};
    this.filtrosChange.emit(this.filtros);
  }
}
