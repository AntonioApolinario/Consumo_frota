import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="bg-gov-gray-80 border-b border-gov-gray-20">
      <div class="container mx-auto px-4 py-3">
        <ol class="flex gap-2 text-sm text-gov-gray-8">
          <li>
            <a routerLink="/" class="hover:underline focus:outline-none focus:ring-2 focus:ring-gov-blue">
              Home
            </a>
          </li>
          <li aria-hidden="true" class="text-gov-gray-20">/</li>
          <li>
            <span class="text-gov-gray-2 font-medium">Combustíveis</span>
          </li>
        </ol>
      </div>
    </nav>
  `
})
export class BreadcrumbsComponent {}
