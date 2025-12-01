import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRapport } from './modal-rapport';

describe('ModalRapport', () => {
  let component: ModalRapport;
  let fixture: ComponentFixture<ModalRapport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRapport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRapport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
