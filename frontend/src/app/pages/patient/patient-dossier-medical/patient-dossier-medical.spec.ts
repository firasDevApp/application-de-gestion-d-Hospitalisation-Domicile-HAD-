import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDossierMedical } from './patient-dossier-medical';

describe('PatientDossierMedical', () => {
  let component: PatientDossierMedical;
  let fixture: ComponentFixture<PatientDossierMedical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDossierMedical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDossierMedical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
