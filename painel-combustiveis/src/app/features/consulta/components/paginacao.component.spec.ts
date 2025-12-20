import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginacaoComponent } from './paginacao.component';
import { PaginacaoConfig } from '../models/consulta.models';

describe('PaginacaoComponent', () => {
  let component: PaginacaoComponent;
  let fixture: ComponentFixture<PaginacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacaoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginacaoComponent);
    component = fixture.componentInstance;
    
    component.config = {
      paginaAtual: 1,
      itensPorPagina: 10,
      totalItens: 50
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPaginas).toBe(5);
    
    component.config.totalItens = 55;
    expect(component.totalPaginas).toBe(6);
    
    component.config.totalItens = 0;
    expect(component.totalPaginas).toBe(1);
  });

  it('should calculate inicio correctly', () => {
    expect(component.inicio).toBe(1);
    
    component.config.paginaAtual = 2;
    expect(component.inicio).toBe(11);
    
    component.config.paginaAtual = 3;
    expect(component.inicio).toBe(21);
  });

  it('should calculate fim correctly', () => {
    expect(component.fim).toBe(10);
    
    component.config.paginaAtual = 5;
    expect(component.fim).toBe(50);
    
    component.config.totalItens = 45;
    expect(component.fim).toBe(45);
  });

  it('should emit previous page on anterior()', () => {
    const emitSpy = jest.spyOn(component.paginaChange, 'emit');
    
    component.config.paginaAtual = 3;
    component.anterior();
    
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should not emit on anterior() when on first page', () => {
    const emitSpy = jest.spyOn(component.paginaChange, 'emit');
    
    component.config.paginaAtual = 1;
    component.anterior();
    
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit next page on proxima()', () => {
    const emitSpy = jest.spyOn(component.paginaChange, 'emit');
    
    component.config.paginaAtual = 2;
    component.proxima();
    
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should not emit on proxima() when on last page', () => {
    const emitSpy = jest.spyOn(component.paginaChange, 'emit');
    
    component.config.paginaAtual = 5;
    component.proxima();
    
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should disable anterior button on first page', () => {
    component.config.paginaAtual = 1;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const anteriorButton = compiled.querySelectorAll('button')[0];
    
    expect(anteriorButton.disabled).toBe(true);
    expect(anteriorButton.classList.contains('opacity-50')).toBe(true);
  });

  it('should disable proxima button on last page', () => {
    component.config.paginaAtual = 5;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const proximaButton = compiled.querySelectorAll('button')[1];
    
    expect(proximaButton.disabled).toBe(true);
    expect(proximaButton.classList.contains('opacity-50')).toBe(true);
  });

  it('should display correct range text', () => {
    const compiled = fixture.nativeElement;
    const text = compiled.querySelector('.text-sm').textContent.trim();
    
    expect(text).toContain('Mostrando 1 a 10 de 50 registros');
  });

  it('should display current page information', () => {
    const compiled = fixture.nativeElement;
    const pageInfo = compiled.textContent;
    
    expect(pageInfo).toContain('Página 1 de 5');
  });
});
