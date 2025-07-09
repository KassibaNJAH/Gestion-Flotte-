import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesComponent } from './alertes.component';

describe('AlertesComponent', () => {
  let component: AlertesComponent;
  let fixture: ComponentFixture<AlertesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertesComponent]
    });
    fixture = TestBed.createComponent(AlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
