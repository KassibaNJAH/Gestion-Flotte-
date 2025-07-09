import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurancesComponent } from './assurances.component';

describe('AssurancesComponent', () => {
  let component: AssurancesComponent;
  let fixture: ComponentFixture<AssurancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssurancesComponent]
    });
    fixture = TestBed.createComponent(AssurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
