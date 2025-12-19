import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placaMask',
  standalone: true
})
export class PlacaMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    if (cleaned.length === 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
    }
    
    return value;
  }
}
