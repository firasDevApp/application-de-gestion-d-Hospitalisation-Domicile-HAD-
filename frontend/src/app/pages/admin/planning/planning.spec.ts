import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanning } from './planning';

describe('AdminPlanning', () => {
  let component: AdminPlanning;
  let fixture: ComponentFixture<AdminPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
