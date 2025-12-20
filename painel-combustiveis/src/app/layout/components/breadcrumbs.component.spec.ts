import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let mockRouter: any;
  let eventsSubject: Subject<any>;

  beforeEach(() => {
    eventsSubject = new Subject();
    
    mockRouter = {
      url: '/dashboard',
      events: eventsSubject.asObservable()
    };
    
    component = new BreadcrumbsComponent(mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with breadcrumbs based on current URL', () => {
    mockRouter.url = '/dashboard';
    component.ngOnInit();
    
    expect(component.breadcrumbs).toEqual([
      { label: 'Dashboard', url: '/dashboard' }
    ]);
  });

  it('should update breadcrumbs on navigation to dashboard', () => {
    component.ngOnInit();
    
    mockRouter.url = '/dashboard';
    eventsSubject.next(new NavigationEnd(1, '/dashboard', '/dashboard'));
    
    expect(component.breadcrumbs).toEqual([
      { label: 'Dashboard', url: '/dashboard' }
    ]);
  });

  it('should update breadcrumbs on navigation to consulta', () => {
    component.ngOnInit();
    
    mockRouter.url = '/consulta';
    eventsSubject.next(new NavigationEnd(2, '/consulta', '/consulta'));
    
    expect(component.breadcrumbs).toEqual([
      { label: 'Consulta', url: '/consulta' }
    ]);
  });
});
