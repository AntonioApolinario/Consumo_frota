import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GovHeaderComponent } from './gov-header.component';

describe('GovHeaderComponent', () => {
  let component: GovHeaderComponent;
  let fixture: ComponentFixture<GovHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GovHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display government branding', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Governo Federal');
    expect(compiled.textContent).toContain('Painel Gerencial de Combustíveis');
  });

  it('should have accessibility links', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Ir para o conteúdo');
    expect(compiled.textContent).toContain('Ir para o menu');
  });

  it('should toggle alto contraste', () => {
    expect(component.altoContraste).toBe(false);
    
    component.toggleAltoContraste();
    expect(component.altoContraste).toBe(true);
    expect(document.body.classList.contains('high-contrast')).toBe(true);
    
    component.toggleAltoContraste();
    expect(component.altoContraste).toBe(false);
    expect(document.body.classList.contains('high-contrast')).toBe(false);
  });

  it('should update alto contraste button text', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('Ativar Alto Contraste');
    
    component.toggleAltoContraste();
    fixture.detectChanges();
    
    expect(compiled.textContent).toContain('Desativar Alto Contraste');
  });

  it('should have proper ARIA attributes', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    
    expect(button.getAttribute('aria-pressed')).toBe('false');
    
    component.toggleAltoContraste();
    fixture.detectChanges();
    
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
