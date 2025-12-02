import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapport } from './rapport';

describe('AdminRapport', () => {
  let component: AdminRapport;
  let fixture: ComponentFixture<AdminRapport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRapport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
