import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner', () => {
    const compiled = fixture.nativeElement;
    const statusDiv = compiled.querySelector('[role="status"]');
    const spinner = compiled.querySelector('.animate-spin');
    
    expect(statusDiv).toBeTruthy();
    expect(spinner).toBeTruthy();
  });

  it('should not have full screen by default', () => {
    expect(component.fullScreen).toBe(false);
    
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('[role="status"]');
    
    expect(container.classList.contains('h-screen')).toBe(false);
  });

  it('should apply full screen class when enabled', () => {
    component.fullScreen = true;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('[role="status"]');
    
    expect(container.classList.contains('h-screen')).toBe(true);
  });

  it('should have proper ARIA attributes', () => {
    const compiled = fixture.nativeElement;
    const statusDiv = compiled.querySelector('[role="status"]');
    
    expect(statusDiv.getAttribute('role')).toBe('status');
    expect(statusDiv.getAttribute('aria-live')).toBe('polite');
    expect(statusDiv.getAttribute('aria-label')).toBe('Carregando conteúdo');
  });

  it('should have screen reader text', () => {
    const compiled = fixture.nativeElement;
    const srText = compiled.querySelector('.sr-only');
    
    expect(srText).toBeTruthy();
    expect(srText.textContent.trim()).toBe('Carregando...');
  });

  it('should have spinner with correct styling', () => {
    const compiled = fixture.nativeElement;
    const spinner = compiled.querySelector('.animate-spin');
    
    expect(spinner.classList.contains('rounded-full')).toBe(true);
    expect(spinner.classList.contains('border-b-2')).toBe(true);
    expect(spinner.classList.contains('border-gov-blue')).toBe(true);
  });
});
