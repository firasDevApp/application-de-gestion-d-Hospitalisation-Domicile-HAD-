import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFooter } from './patient-footer';

describe('PatientFooter', () => {
  let component: PatientFooter;
  let fixture: ComponentFixture<PatientFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
