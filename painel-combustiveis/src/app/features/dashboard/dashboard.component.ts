import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-h1 font-bold text-gov-gray-2">Dashboard</h1>
      <p class="text-gov-gray-8">Visão geral dos dados de combustíveis da frota nacional.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-6 rounded shadow">
          <h2 class="text-h3 font-semibold text-gov-blue mb-2">Em Desenvolvimento</h2>
          <p class="text-gov-gray-8">KPIs em breve...</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
