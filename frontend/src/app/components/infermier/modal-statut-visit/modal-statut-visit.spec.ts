import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatutVisit } from './modal-statut-visit';

describe('ModalStatutVisit', () => {
  let component: ModalStatutVisit;
  let fixture: ComponentFixture<ModalStatutVisit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStatutVisit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStatutVisit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
