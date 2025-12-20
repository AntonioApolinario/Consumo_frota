import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Remove todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Se não tiver 11 dígitos, retorna o valor original
    if (cleaned.length !== 11) return value;
    
    // Aplica a máscara com asteriscos: ***.XXX.XXX-**
    // Mostra apenas os dígitos do meio (posições 3-8)
    return `***.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-**`;
  }
}
