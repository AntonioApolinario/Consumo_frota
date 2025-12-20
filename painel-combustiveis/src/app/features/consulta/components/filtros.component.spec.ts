import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FiltrosComponent } from './filtros.component';
import { TipoCombustivel } from '../../../core/models/enums';

describe('FiltrosComponent', () => {
  let component: FiltrosComponent;
  let fixture: ComponentFixture<FiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty filters', () => {
    expect(component.filtros).toEqual({});
  });

  it('should have estados list populated', () => {
    expect(component.estados).toBeDefined();
    expect(component.estados.length).toBeGreaterThan(0);
  });

  it('should have tipos de combustivel populated', () => {
    expect(component.tiposCombustivel).toBeDefined();
    expect(component.tiposCombustivel.length).toBe(Object.values(TipoCombustivel).length);
  });

  it('should emit filtrosChange when aplicar is called', () => {
    const emitSpy = jest.spyOn(component.filtrosChange, 'emit');
    
    component.filtros = { uf: 'SP' };
    component.aplicar();
    
    expect(emitSpy).toHaveBeenCalledWith({ uf: 'SP' });
  });

  it('should clear filters when limpar is called', () => {
    const emitSpy = jest.spyOn(component.filtrosChange, 'emit');
    
    component.filtros = { uf: 'SP', tipoCombustivel: TipoCombustivel.GASOLINA };
    component.limpar();
    
    expect(component.filtros).toEqual({});
    expect(emitSpy).toHaveBeenCalledWith({});
  });

  it('should display estado select with options', () => {
    const compiled = fixture.nativeElement;
    const estadoSelect = compiled.querySelectorAll('select')[0];
    
    expect(estadoSelect).toBeTruthy();
    expect(estadoSelect.querySelectorAll('option').length).toBeGreaterThan(1);
  });

  it('should display combustivel select with options', () => {
    const compiled = fixture.nativeElement;
    const combustivelSelect = compiled.querySelectorAll('select')[1];
    
    expect(combustivelSelect).toBeTruthy();
    expect(combustivelSelect.querySelectorAll('option').length).toBeGreaterThan(1);
  });

  it('should display date inputs', () => {
    const compiled = fixture.nativeElement;
    const dateInputs = compiled.querySelectorAll('input[type="date"]');
    
    expect(dateInputs.length).toBe(2);
  });

  it('should display limpar button', () => {
    const compiled = fixture.nativeElement;
    const limparButton = compiled.querySelector('button');
    
    expect(limparButton).toBeTruthy();
    expect(limparButton.textContent.trim()).toBe('Limpar Filtros');
  });
});
