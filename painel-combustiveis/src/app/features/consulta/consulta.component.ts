import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-h1 font-bold text-gov-gray-2">Consulta de Abastecimentos</h1>
      <p class="text-gov-gray-8">Consulte e filtre os registros de abastecimento da frota.</p>
      
      <div class="bg-white p-6 rounded shadow">
        <h2 class="text-h3 font-semibold text-gov-blue mb-2">Em Desenvolvimento</h2>
        <p class="text-gov-gray-8">Listagem e filtros em breve...</p>
      </div>
    </div>
  `
})
export class ConsultaComponent {}
