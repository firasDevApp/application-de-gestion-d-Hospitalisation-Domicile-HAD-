import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conge } from './conge';

describe('Conge', () => {
  let component: Conge;
  let fixture: ComponentFixture<Conge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
