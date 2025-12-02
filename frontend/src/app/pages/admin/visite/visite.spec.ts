import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisite } from './visite';

describe('AdminVisite', () => {
  let component: AdminVisite;
  let fixture: ComponentFixture<AdminVisite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVisite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
