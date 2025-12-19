import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaFacade } from './facades/consulta.facade';
import { FiltrosComponent } from './components/filtros.component';
import { PaginacaoComponent } from './components/paginacao.component';
import { LoadingSpinnerComponent, ErrorMessageComponent, CpfMaskPipe, CurrencyBrPipe } from '../../shared';
import { FiltrosConsulta } from './models/consulta.models';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule,
    FiltrosComponent,
    PaginacaoComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    CpfMaskPipe,
    CurrencyBrPipe
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-h1 font-bold text-gov-gray-2">Consulta de Abastecimentos</h1>
        <p class="text-gov-gray-8 mt-2">Consulte e filtre os registros de abastecimento da frota nacional.</p>
      </div>

      <app-filtros (filtrosChange)="aplicarFiltros($event)"></app-filtros>

      <app-loading-spinner *ngIf="facade.loading$ | async"></app-loading-spinner>

      <app-error-message 
        *ngIf="facade.error$ | async as error"
        [message]="error">
      </app-error-message>

      <div *ngIf="facade.abastecimentosFiltrados$ | async as abastecimentos" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gov-blue text-white">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">Data</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Posto</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Cidade/UF</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Combustível</th>
                <th class="px-6 py-3 text-right text-sm font-semibold">Valor/Litro</th>
                <th class="px-6 py-3 text-right text-sm font-semibold">Total Pago</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gov-gray-20">
              <tr *ngFor="let item of abastecimentos" 
                  class="hover:bg-gov-gray-80 cursor-pointer transition-colors"
                  (click)="verDetalhes(item)">
                <td class="px-6 py-4 text-sm text-gov-gray-2">
                  {{ item.data | date:'dd/MM/yyyy HH:mm' }}
                </td>
                <td class="px-6 py-4 text-sm text-gov-gray-2">{{ item.posto }}</td>
                <td class="px-6 py-4 text-sm text-gov-gray-2">{{ item.cidade }}/{{ item.uf }}</td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2 py-1 text-xs font-medium rounded"
                        [ngClass]="{
                          'bg-blue-100 text-blue-800': item.tipoCombustivel === 'Gasolina',
                          'bg-green-100 text-green-800': item.tipoCombustivel === 'Diesel',
                          'bg-yellow-100 text-yellow-800': item.tipoCombustivel === 'Etanol'
                        }">
                    {{ item.tipoCombustivel }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-right text-gov-gray-2">
                  {{ item.valorLitro | currencyBr }}
                </td>
                <td class="px-6 py-4 text-sm text-right font-semibold text-gov-blue">
                  {{ item.totalPago | currencyBr }}
                </td>
              </tr>
              <tr *ngIf="abastecimentos.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gov-gray-8">
                  Nenhum registro encontrado com os filtros aplicados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <app-paginacao 
        *ngIf="facade.paginacao$ | async as paginacao"
        [config]="paginacao"
        (paginaChange)="mudarPagina($event)">
      </app-paginacao>
    </div>
  `
})
export class ConsultaComponent implements OnInit {
  constructor(public facade: ConsultaFacade) {}

  ngOnInit(): void {
    this.facade.loadAbastecimentos();
  }

  aplicarFiltros(filtros: FiltrosConsulta): void {
    this.facade.aplicarFiltro(filtros);
  }

  mudarPagina(pagina: number): void {
    this.facade.mudarPagina(pagina);
  }

  verDetalhes(abastecimento: any): void {
    console.log('Ver detalhes:', abastecimento);
  }
}
