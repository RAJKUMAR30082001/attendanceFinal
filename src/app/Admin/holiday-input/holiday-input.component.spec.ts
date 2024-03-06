import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayInputComponent } from './holiday-input.component';

describe('HolidayInputComponent', () => {
  let component: HolidayInputComponent;
  let fixture: ComponentFixture<HolidayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
