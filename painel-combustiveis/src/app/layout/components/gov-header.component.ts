import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gov-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-gov-blue text-white" role="banner">
      <div class="container mx-auto px-4">
        <!-- Barra de Acessibilidade -->
        <nav aria-label="Atalhos de acessibilidade" class="flex justify-end gap-4 py-2 text-sm border-b border-gov-blue-warm">
          <a href="#conteudo" 
             class="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
             aria-label="Ir direto para o conteúdo principal">
            Ir para o conteúdo
          </a>
          <a href="#menu" 
             class="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
             aria-label="Ir direto para o menu de navegação">
            Ir para o menu
          </a>
          <button 
            (click)="toggleAltoContraste()" 
            class="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            type="button"
            [attr.aria-pressed]="altoContraste"
            [attr.aria-label]="altoContraste ? 'Desativar alto contraste' : 'Ativar alto contraste'">
            {{ altoContraste ? 'Desativar' : 'Ativar' }} Alto Contraste
          </button>
        </nav>

        <!-- Logo e Título -->
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-4">
            <!-- Logo customizável -->
            @if (logoPath) {
              <img [src]="logoPath" 
                   alt="Logo da organização" 
                   class="h-12 w-auto object-contain"
                   role="img">
            } @else {
              <div class="w-12 h-12 bg-white rounded flex items-center justify-center" 
                   role="img" 
                   aria-label="Logotipo do Governo Federal">
                <span class="text-gov-blue font-bold text-xl" aria-hidden="true">BR</span>
              </div>
            }
            <div>
              <h1 class="text-xl font-bold" style="font-family: 'Montserrat', sans-serif;">Governo Federal</h1>
              <p class="text-sm" style="font-family: 'Rawline', sans-serif;">Painel Gerencial de Combustíveis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class GovHeaderComponent {
  altoContraste = false;
  
  // Caminho para logo customizável - adicione sua logo em assets/images/logo.png
  logoPath = '/assets/images/logo.png';

  toggleAltoContraste(): void {
    this.altoContraste = !this.altoContraste;
    document.body.classList.toggle('high-contrast', this.altoContraste);
  }
}
