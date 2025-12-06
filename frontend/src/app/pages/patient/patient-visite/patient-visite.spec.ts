import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisite } from './patient-visite';

describe('PatientVisite', () => {
  let component: PatientVisite;
  let fixture: ComponentFixture<PatientVisite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientVisite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientVisite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
