import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayNotificationComponent } from './holiday-notification.component';

describe('HolidayNotificationComponent', () => {
  let component: HolidayNotificationComponent;
  let fixture: ComponentFixture<HolidayNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
