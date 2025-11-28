import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDemandeConge } from './modal-demande-conge';

describe('ModalDemandeConge', () => {
  let component: ModalDemandeConge;
  let fixture: ComponentFixture<ModalDemandeConge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDemandeConge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDemandeConge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
