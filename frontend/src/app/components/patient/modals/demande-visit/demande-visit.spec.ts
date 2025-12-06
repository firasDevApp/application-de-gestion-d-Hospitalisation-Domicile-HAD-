import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVisit } from './demande-visit';

describe('DemandeVisit', () => {
  let component: DemandeVisit;
  let fixture: ComponentFixture<DemandeVisit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeVisit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeVisit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
