import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienListComponent } from './entretien-list.component';

describe('EntretienListComponent', () => {
  let component: EntretienListComponent;
  let fixture: ComponentFixture<EntretienListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntretienListComponent]
    });
    fixture = TestBed.createComponent(EntretienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
