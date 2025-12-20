import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default error message', () => {
    const compiled = fixture.nativeElement;
    const messageElement = compiled.querySelector('[role="alert"]');
    
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('Ocorreu um erro ao carregar os dados');
  });

  it('should display custom error message', () => {
    component.message = 'Erro personalizado';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const messageElement = compiled.querySelector('[role="alert"]');
    
    expect(messageElement.textContent).toContain('Erro personalizado');
  });

  it('should have proper ARIA attributes', () => {
    const compiled = fixture.nativeElement;
    const alertElement = compiled.querySelector('[role="alert"]');
    
    expect(alertElement.getAttribute('role')).toBe('alert');
    expect(alertElement.getAttribute('aria-live')).toBe('assertive');
    expect(alertElement.getAttribute('aria-atomic')).toBe('true');
  });

  it('should have error styling classes', () => {
    const compiled = fixture.nativeElement;
    const alertElement = compiled.querySelector('[role="alert"]');
    
    expect(alertElement.classList.contains('bg-red-50')).toBe(true);
    expect(alertElement.classList.contains('border-red-200')).toBe(true);
    expect(alertElement.classList.contains('text-red-700')).toBe(true);
  });
});
