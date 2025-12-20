import { PriceEvolutionChartComponent } from './price-evolution-chart.component';

describe('PriceEvolutionChartComponent', () => {
  let component: PriceEvolutionChartComponent;

  beforeEach(() => {
    component = new PriceEvolutionChartComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default view mode', () => {
    expect(component.currentView).toBe('media');
  });

  it('should return correct view mode label for media', () => {
    component.currentView = 'media';
    expect(component.getViewModeLabel()).toBe('Média');
  });

  it('should return correct view mode label for maxima', () => {
    component.currentView = 'maxima';
    expect(component.getViewModeLabel()).toBe('Máxima');
  });

  it('should return correct view mode label for minima', () => {
    component.currentView = 'minima';
    expect(component.getViewModeLabel()).toBe('Mínima');
  });

  it('should toggle view from media to maxima', () => {
    component.currentView = 'media';
    component.toggleView('maxima');
    expect(component.currentView).toBe('maxima');
  });

  it('should toggle view from media to minima', () => {
    component.currentView = 'media';
    component.toggleView('minima');
    expect(component.currentView).toBe('minima');
  });

  it('should toggle view from maxima to media', () => {
    component.currentView = 'maxima';
    component.toggleView('media');
    expect(component.currentView).toBe('media');
  });
});
