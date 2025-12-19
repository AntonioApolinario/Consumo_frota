import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GovHeaderComponent } from './components/gov-header.component';
import { MenuComponent } from './components/menu.component';
import { BreadcrumbsComponent } from './components/breadcrumbs.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    GovHeaderComponent, 
    MenuComponent, 
    BreadcrumbsComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-gov-gray-80">
      <app-gov-header></app-gov-header>
      <app-menu></app-menu>
      <app-breadcrumbs></app-breadcrumbs>
      
      <main id="conteudo" class="flex-1 container mx-auto px-4 py-6" role="main" aria-label="Conteúdo principal">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-gov-blue text-white mt-auto" role="contentinfo">
        <div class="container mx-auto px-4 py-6 text-center text-sm">
          <p>Governo Federal - Painel Gerencial de Combustíveis © 2025</p>
        </div>
      </footer>
    </div>
  `
})
export class LayoutComponent {}
