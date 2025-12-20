import { DashboardComponent } from './dashboard.component';
import { DashboardFacade } from './facades/dashboard.facade';
import { of, throwError } from 'rxjs';
import { KpiData } from './models/dashboard.models';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let mockFacade: jest.Mocked<DashboardFacade>;

  beforeEach(() => {
    mockFacade = {
      loading$: of(false),
      error$: of(null),
      kpiData$: of(null),
      loadDashboardData: jest.fn()
    } as any;

    component = new DashboardComponent(mockFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDashboardData on init', () => {
    component.ngOnInit();
    expect(mockFacade.loadDashboardData).toHaveBeenCalled();
  });

  it('should have facade accessible', () => {
    expect(component.facade).toBe(mockFacade);
  });
});
