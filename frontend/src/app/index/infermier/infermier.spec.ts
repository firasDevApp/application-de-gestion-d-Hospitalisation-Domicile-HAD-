import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infermier } from './infermier';

describe('Infermier', () => {
  let component: Infermier;
  let fixture: ComponentFixture<Infermier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infermier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infermier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
