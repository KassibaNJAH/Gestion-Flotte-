import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleTechniqueFormComponent } from './controle-technique-form.component';

describe('ControleFormComponent', () => {
  let component: ControleTechniqueFormComponent ;
  let fixture: ComponentFixture<ControleTechniqueFormComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControleTechniqueFormComponent ]
    });
    fixture = TestBed.createComponent(ControleTechniqueFormComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
