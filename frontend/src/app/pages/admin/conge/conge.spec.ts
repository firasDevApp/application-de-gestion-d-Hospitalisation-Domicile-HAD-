import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConge } from './conge';

describe('AdminConge', () => {
  let component: AdminConge;
  let fixture: ComponentFixture<AdminConge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
