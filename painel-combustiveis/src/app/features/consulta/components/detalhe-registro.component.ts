import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Abastecimento } from '../models/consulta.models';
import { CpfMaskPipe, PlacaMaskPipe, CurrencyBrPipe } from '../../../shared';

@Component({
  selector: 'app-detalhe-registro',
  standalone: true,
  imports: [CommonModule, CpfMaskPipe, PlacaMaskPipe, CurrencyBrPipe],
  template: `
    <div *ngIf="abastecimento" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         (click)="fechar()">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
           (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="bg-gov-blue text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 class="text-h3 font-semibold">Detalhes do Abastecimento</h2>
          <button 
            (click)="fechar()"
            class="text-white hover:text-gov-gray-80 text-2xl leading-none"
            aria-label="Fechar">
            ×
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          
          <!-- Informações do Abastecimento -->
          <div>
            <h3 class="text-lg font-semibold text-gov-blue mb-3">Informações do Abastecimento</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Data e Hora</label>
                <p class="text-gov-gray-2">{{ abastecimento.data | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Tipo de Combustível</label>
                <p class="text-gov-gray-2">{{ abastecimento.tipoCombustivel }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Posto</label>
                <p class="text-gov-gray-2">{{ abastecimento.posto }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Localização</label>
                <p class="text-gov-gray-2">{{ abastecimento.cidade }}/{{ abastecimento.uf }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Valor por Litro</label>
                <p class="text-gov-blue font-semibold">{{ abastecimento.valorLitro | currencyBr }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Litros Abastecidos</label>
                <p class="text-gov-gray-2">{{ abastecimento.litros.toFixed(2) }}L</p>
              </div>
              <div class="col-span-2">
                <label class="text-sm font-medium text-gov-gray-8">Total Pago</label>
                <p class="text-2xl text-gov-blue font-bold">{{ abastecimento.totalPago | currencyBr }}</p>
              </div>
            </div>
          </div>

          <hr class="border-gov-gray-20">

          <!-- Informações do Motorista -->
          <div>
            <h3 class="text-lg font-semibold text-gov-blue mb-3">Motorista</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Nome</label>
                <p class="text-gov-gray-2">{{ abastecimento.motorista.nome }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">CPF</label>
                <p class="text-gov-gray-2">{{ abastecimento.motorista.cpf | cpfMask }}</p>
              </div>
            </div>
          </div>

          <hr class="border-gov-gray-20">

          <!-- Informações do Veículo -->
          <div>
            <h3 class="text-lg font-semibold text-gov-blue mb-3">Veículo</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Placa</label>
                <p class="text-gov-gray-2 font-mono">{{ abastecimento.veiculo.placa | placaMask }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gov-gray-8">Modelo</label>
                <p class="text-gov-gray-2">{{ abastecimento.veiculo.modelo }}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="bg-gov-gray-80 px-6 py-4 flex justify-between items-center rounded-b-lg">
          <button 
            (click)="reportarErro()"
            class="px-6 py-2 bg-gov-yellow text-gov-gray-2 font-semibold rounded hover:bg-yellow-500 transition-colors">
            Reportar Erro
          </button>
          <button 
            (click)="fechar()"
            class="px-6 py-2 bg-gov-gray-20 text-gov-gray-2 rounded hover:bg-gov-gray-8 hover:text-white transition-colors">
            Fechar
          </button>
        </div>

      </div>
    </div>
  `
})
export class DetalheRegistroComponent {
  @Input() abastecimento: Abastecimento | null = null;
  @Output() close = new EventEmitter<void>();

  fechar(): void {
    this.close.emit();
  }

  reportarErro(): void {
    console.log('Reportar erro para abastecimento:', this.abastecimento?.id);
    alert(`Erro reportado para o abastecimento #${this.abastecimento?.id}\n\nEsta funcionalidade será implementada futuramente.`);
  }
}
