import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav id="menu" class="bg-gov-blue-light text-white shadow-md">
      <div class="container mx-auto px-4">
        <ul class="flex gap-1">
          <li>
            <a 
              routerLink="/dashboard" 
              routerLinkActive="bg-gov-blue-warm"
              class="block px-6 py-3 hover:bg-gov-blue-warm transition-colors focus:outline-none focus:ring-2 focus:ring-white">
              Dashboard
            </a>
          </li>
          <li>
            <a 
              routerLink="/consulta" 
              routerLinkActive="bg-gov-blue-warm"
              class="block px-6 py-3 hover:bg-gov-blue-warm transition-colors focus:outline-none focus:ring-2 focus:ring-white">
              Consulta
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class MenuComponent {}
