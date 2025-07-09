import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretiensComponent } from './entretiens.component';

describe('EntretiensComponent', () => {
  let component: EntretiensComponent;
  let fixture: ComponentFixture<EntretiensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntretiensComponent]
    });
    fixture = TestBed.createComponent(EntretiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
