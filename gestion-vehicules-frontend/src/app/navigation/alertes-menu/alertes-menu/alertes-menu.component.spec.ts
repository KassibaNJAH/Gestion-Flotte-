import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesMenuComponent } from './alertes-menu.component';

describe('AlertesMenuComponent', () => {
  let component: AlertesMenuComponent;
  let fixture: ComponentFixture<AlertesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertesMenuComponent]
    });
    fixture = TestBed.createComponent(AlertesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
