import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitLeaveComponent } from './permit-leave.component';

describe('PermitLeaveComponent', () => {
  let component: PermitLeaveComponent;
  let fixture: ComponentFixture<PermitLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermitLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
