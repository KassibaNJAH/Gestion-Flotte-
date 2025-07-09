import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienHistoricComponent } from './entretien-historic.component';

describe('EntretienHistoricComponent', () => {
  let component: EntretienHistoricComponent;
  let fixture: ComponentFixture<EntretienHistoricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntretienHistoricComponent]
    });
    fixture = TestBed.createComponent(EntretienHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
