import { RegionConsumptionChartComponent } from './region-consumption-chart.component';
import { DashboardFacade } from '../facades/dashboard.facade';
import { of } from 'rxjs';
import { DrillDownLevel } from '../models/dashboard.models';

describe('RegionConsumptionChartComponent', () => {
  let component: RegionConsumptionChartComponent;
  let mockFacade: jest.Mocked<DashboardFacade>;

  beforeEach(() => {
    mockFacade = {
      chartData$: of([]),
      currentLevel$: of(null),
      drillDown: jest.fn(),
      drillUp: jest.fn(),
      resetView: jest.fn()
    } as any;

    component = new RegionConsumptionChartComponent(mockFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false for canDrillUp when currentLevel is null', () => {
    component.currentLevel = null;
    expect(component.canDrillUp()).toBe(false);
  });

  it('should return true for canDrillUp when currentLevel type is not regiao', () => {
    component.currentLevel = { type: 'estado', value: 'SP', label: 'São Paulo' } as DrillDownLevel;
    expect(component.canDrillUp()).toBe(true);
  });

  it('should return correct level name for regiao', () => {
    component.currentLevel = { type: 'regiao' } as DrillDownLevel;
    expect(component.getLevelName()).toBe('região');
  });

  it('should return correct level name for estado', () => {
    component.currentLevel = { type: 'estado', value: 'SP', label: 'São Paulo' } as DrillDownLevel;
    expect(component.getLevelName()).toBe('estado');
  });

  it('should return correct level name for municipio', () => {
    component.currentLevel = { type: 'municipio', value: 'Campinas', label: 'Campinas' } as DrillDownLevel;
    expect(component.getLevelName()).toBe('município');
  });

  it('should call facade drillUp on onDrillUp', () => {
    component.onDrillUp();
    expect(mockFacade.drillUp).toHaveBeenCalled();
  });

  it('should call facade reset on onReset', () => {
    component.onReset();
    expect(mockFacade.resetView).toHaveBeenCalled();
  });

  it('should return default title when no level', () => {
    component.currentLevel = null;
    expect(component.getTitle()).toBe('Consumo por Região');
  });
});
