import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav id="menu" class="bg-gov-blue-light text-white shadow-md" role="navigation" aria-label="Menu principal">
      <div class="container mx-auto px-4">
        <ul class="flex gap-1" role="menubar" role="menubar">
          <li role="none">
            <a 
              routerLink="/dashboard" 
              routerLinkActive="bg-gov-blue-warm"
              class="block px-6 py-3 hover:bg-gov-blue-warm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              role="menuitem"
              [attr.aria-current]="isActive('/dashboard') ? 'page' : null">
              Dashboard
            </a>
          </li>
          <li role="none">
            <a 
              routerLink="/consulta" 
              routerLinkActive="bg-gov-blue-warm"
              class="block px-6 py-3 hover:bg-gov-blue-warm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              role="menuitem"
              [attr.aria-current]="isActive('/consulta') ? 'page' : null">
              Consulta
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class MenuComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
