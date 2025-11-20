import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visite } from './visite';

describe('Visite', () => {
  let component: Visite;
  let fixture: ComponentFixture<Visite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Visite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
