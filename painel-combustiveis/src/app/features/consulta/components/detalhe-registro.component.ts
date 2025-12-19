import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Abastecimento } from '../models/consulta.models';
import { CpfMaskPipe, PlacaMaskPipe, CurrencyBrPipe } from '../../../shared';

@Component({
  selector: 'app-detalhe-registro',
  standalone: true,
  imports: [CommonModule, CpfMaskPipe, PlacaMaskPipe, CurrencyBrPipe],
  template: `
    <div *ngIf="abastecimento" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         (click)="fechar()"
         (keydown.escape)="fechar()"
         role="dialog"
         aria-modal="true"
         aria-labelledby="modal-title">
      <div #modalContent
           class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
           (click)="$event.stopPropagation()"
           tabindex="-1">
        
        <!-- Header -->
        <div class="bg-gov-blue text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 id="modal-title" class="text-h3 font-semibold">Detalhes do Abastecimento</h2>
          <button 
            #closeButton
            (click)="fechar()"
            class="text-white hover:text-gov-gray-80 text-2xl leading-none"
            aria-label="Fechar modal"
            type="button">
            ×
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          
          <!-- Informações do Abastecimento -->
          <div role="region" aria-labelledby="info-abastecimento">
            <h3 id="info-abastecimento" class="text-lg font-semibold text-gov-blue mb-3">Informações do Abastecimento</h3>
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
          <div role="region" aria-labelledby="info-motorista">
            <h3 id="info-motorista" class="text-lg font-semibold text-gov-blue mb-3">Motorista</h3>
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
          <div role="region" aria-labelledby="info-veiculo">
            <h3 id="info-veiculo" class="text-lg font-semibold text-gov-blue mb-3">Veículo</h3>
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
            class="px-6 py-2 bg-gov-yellow text-gov-gray-2 font-semibold rounded hover:bg-yellow-500 transition-colors"
            type="button"
            aria-label="Reportar erro neste abastecimento">
            Reportar Erro
          </button>
          <button 
            (click)="fechar()"
            class="px-6 py-2 bg-gov-gray-20 text-gov-gray-2 rounded hover:bg-gov-gray-8 hover:text-white transition-colors"
            type="button"
            aria-label="Fechar modal">
            Fechar
          </button>
        </div>

      </div>
    </div>
  `
})
export class DetalheRegistroComponent implements OnInit, OnDestroy {
  @Input() abastecimento: Abastecimento | null = null;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContent') modalContent!: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  
  private previousActiveElement: HTMLElement | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Salvar elemento com foco anterior
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Focar no modal após render
    setTimeout(() => {
      this.closeButton?.nativeElement?.focus();
    }, 100);

    // Trap de foco no modal
    document.addEventListener('keydown', this.handleTabKey);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    // Remover listener
    document.removeEventListener('keydown', this.handleTabKey);
    
    // Restaurar foco ao elemento anterior
    this.previousActiveElement?.focus();
  }

  private handleTabKey = (event: KeyboardEvent): void => {
    if (!this.isBrowser || event.key !== 'Tab') return;

    const focusableElements = this.modalContent?.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  fechar(): void {
    this.close.emit();
  }

  reportarErro(): void {
    console.log('Reportar erro para abastecimento:', this.abastecimento?.id);
    alert(`Erro reportado para o abastecimento #${this.abastecimento?.id}\n\nEsta funcionalidade será implementada futuramente.`);
  }
}
