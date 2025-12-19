import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Erro: </strong>
      <span class="block sm:inline">{{ message }}</span>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() message = 'Ocorreu um erro ao carregar os dados.';
}
