import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNav } from './patient-nav';

describe('PatientNav', () => {
  let component: PatientNav;
  let fixture: ComponentFixture<PatientNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
