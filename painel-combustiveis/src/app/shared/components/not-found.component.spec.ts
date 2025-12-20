import { NotFoundComponent } from './not-found.component';
import { Router } from '@angular/router';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;

  beforeEach(() => {
    component = new NotFoundComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
