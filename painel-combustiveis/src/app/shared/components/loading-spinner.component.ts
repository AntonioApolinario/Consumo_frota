import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center p-8" [class.h-screen]="fullScreen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gov-blue"></div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() fullScreen = false;
}
