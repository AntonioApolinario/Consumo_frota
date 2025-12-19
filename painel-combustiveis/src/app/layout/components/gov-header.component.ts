import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gov-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-gov-blue text-white">
      <div class="container mx-auto px-4">
        <!-- Barra de Acessibilidade -->
        <div class="flex justify-end gap-4 py-2 text-sm border-b border-gov-blue-warm">
          <a href="#conteudo" class="hover:underline focus:outline-none focus:ring-2 focus:ring-white">
            Ir para o conteúdo
          </a>
          <a href="#menu" class="hover:underline focus:outline-none focus:ring-2 focus:ring-white">
            Ir para o menu
          </a>
          <button 
            (click)="toggleAltoContraste()" 
            class="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            [attr.aria-label]="altoContraste ? 'Desativar alto contraste' : 'Ativar alto contraste'">
            {{ altoContraste ? 'Desativar' : 'Ativar' }} Alto Contraste
          </button>
        </div>

        <!-- Logo e Título -->
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded flex items-center justify-center">
              <span class="text-gov-blue font-bold text-xl">BR</span>
            </div>
            <div>
              <h1 class="text-xl font-bold">Governo Federal</h1>
              <p class="text-sm">Painel Gerencial de Combustíveis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class GovHeaderComponent {
  altoContraste = false;

  toggleAltoContraste(): void {
    this.altoContraste = !this.altoContraste;
    document.body.classList.toggle('high-contrast', this.altoContraste);
  }
}
