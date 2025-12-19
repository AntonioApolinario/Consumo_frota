import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 border-l-4" [class]="borderColorClass">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gov-gray-8 mb-1">{{ title }}</p>
          <p class="text-3xl font-bold" [class]="valueColorClass">{{ value }}</p>
          <p class="text-xs text-gov-gray-20 mt-1" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <div class="text-4xl opacity-20" *ngIf="icon">{{ icon }}</div>
      </div>
    </div>
  `
})
export class KpiCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() color: 'blue' | 'green' | 'yellow' = 'blue';

  get borderColorClass(): string {
    const colors = {
      blue: 'border-gov-blue',
      green: 'border-gov-green',
      yellow: 'border-gov-yellow'
    };
    return colors[this.color];
  }

  get valueColorClass(): string {
    const colors = {
      blue: 'text-gov-blue',
      green: 'text-gov-green',
      yellow: 'text-gov-gray-2'
    };
    return colors[this.color];
  }
}
