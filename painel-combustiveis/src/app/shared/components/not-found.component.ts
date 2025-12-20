import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="text-center max-w-md">
        <div class="mb-8">
          <h1 class="text-6xl font-bold text-gov-blue mb-2" aria-label="Erro 404">404</h1>
          <div class="w-24 h-1 bg-gov-blue mx-auto mb-4"></div>
        </div>
        
        <h2 class="text-2xl font-semibold text-gov-gray-2 mb-4">
          Página não encontrada
        </h2>
        
        <p class="text-gov-gray-8 mb-8">
          A página que você está procurando não existe ou foi movida.
          Verifique o endereço digitado ou retorne à página inicial.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            routerLink="/dashboard"
            class="px-6 py-3 bg-gov-blue text-white rounded hover:bg-gov-blue-warm transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2"
            aria-label="Voltar para a página inicial">
            Ir para o Dashboard
          </a>
          <a 
            routerLink="/consulta"
            class="px-6 py-3 bg-gov-gray-20 text-gov-gray-2 rounded hover:bg-gov-gray-8 hover:text-white transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2"
            aria-label="Ir para a página de consulta">
            Ver Consulta
          </a>
        </div>
        
        <div class="mt-8 text-sm text-gov-gray-60">
          <p>Se você acredita que isso é um erro, entre em contato com o suporte.</p>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
