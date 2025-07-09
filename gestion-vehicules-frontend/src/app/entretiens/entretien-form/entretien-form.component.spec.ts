import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienFormComponent } from './entretien-form.component';

describe('EntretienFormComponent', () => {
  let component: EntretienFormComponent;
  let fixture: ComponentFixture<EntretienFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntretienFormComponent]
    });
    fixture = TestBed.createComponent(EntretienFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
