import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepondreConge } from './repondre-conge';

describe('RepondreConge', () => {
  let component: RepondreConge;
  let fixture: ComponentFixture<RepondreConge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepondreConge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepondreConge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
