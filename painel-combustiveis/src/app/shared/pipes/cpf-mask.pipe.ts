import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length !== 11) return value;
    
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }
}
