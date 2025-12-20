import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card.component';

describe('KpiCardComponent', () => {
  let component: KpiCardComponent;
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and value', () => {
    component.title = 'Total Registros';
    component.value = '1,234';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Total Registros');
    expect(compiled.textContent).toContain('1,234');
  });

  it('should display subtitle when provided', () => {
    component.subtitle = 'Atualizado há 5 minutos';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Atualizado há 5 minutos');
  });

  it('should display icon when provided', () => {
    component.icon = '📊';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('📊');
  });

  it('should apply correct border color class for blue', () => {
    component.color = 'blue';
    expect(component.borderColorClass).toBe('border-gov-blue');
  });

  it('should apply correct border color class for green', () => {
    component.color = 'green';
    expect(component.borderColorClass).toBe('border-gov-green');
  });

  it('should apply correct border color class for yellow', () => {
    component.color = 'yellow';
    expect(component.borderColorClass).toBe('border-gov-yellow');
  });

  it('should apply correct value color class for blue', () => {
    component.color = 'blue';
    expect(component.valueColorClass).toBe('text-gov-blue');
  });

  it('should apply correct value color class for green', () => {
    component.color = 'green';
    expect(component.valueColorClass).toBe('text-gov-green');
  });

  it('should apply correct value color class for yellow', () => {
    component.color = 'yellow';
    expect(component.valueColorClass).toBe('text-gov-gray-2');
  });
});
