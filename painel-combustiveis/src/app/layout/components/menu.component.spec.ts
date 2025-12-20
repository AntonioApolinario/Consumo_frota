import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      url: '/dashboard',
      navigate: jest.fn()
    };
    
    component = new MenuComponent(mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if route is active', () => {
    mockRouter.url = '/dashboard';
    expect(component.isActive('/dashboard')).toBe(true);
    expect(component.isActive('/consulta')).toBe(false);
    
    mockRouter.url = '/consulta';
    expect(component.isActive('/consulta')).toBe(true);
    expect(component.isActive('/dashboard')).toBe(false);
  });
});
