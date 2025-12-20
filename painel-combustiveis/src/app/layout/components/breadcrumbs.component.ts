import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="Breadcrumb - caminho da página" class="bg-gov-gray-80 border-b border-gov-gray-20">
      <div class="container mx-auto px-4 py-3">
        <ol class="flex gap-2 text-sm text-gov-gray-8">
          <li>
            <a routerLink="/" 
               class="hover:underline focus:outline-none focus:ring-2 focus:ring-gov-blue"
               aria-label="Voltar para a página inicial">
              Home
            </a>
          </li>
          <li aria-hidden="true" class="text-gov-gray-20">/</li>
          <li>
            <span class="text-gov-gray-2">Combustíveis</span>
          </li>
          <ng-container *ngIf="breadcrumbs.length > 0">
            <li aria-hidden="true" class="text-gov-gray-20">/</li>
            <li *ngFor="let breadcrumb of breadcrumbs; let last = last">
              <a *ngIf="!last" 
                 [routerLink]="breadcrumb.url"
                 class="hover:underline focus:outline-none focus:ring-2 focus:ring-gov-blue">
                {{ breadcrumb.label }}
              </a>
              <span *ngIf="last" 
                    class="text-gov-gray-2 font-medium"
                    [attr.aria-current]="last ? 'page' : null">
                {{ breadcrumb.label }}
              </span>
            </li>
          </ng-container>
        </ol>
      </div>
    </nav>
  `
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  private routeLabels: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/consulta': 'Consulta'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateBreadcrumbs();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs(): void {
    const url = this.router.url.split('?')[0]; // Remove query params
    
    if (url === '/' || url === '') {
      this.breadcrumbs = [];
      return;
    }

    const label = this.routeLabels[url] || this.formatLabel(url);
    this.breadcrumbs = [{ label, url }];
  }

  private formatLabel(url: string): string {
    const lastSegment = url.split('/').pop() || '';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
}
