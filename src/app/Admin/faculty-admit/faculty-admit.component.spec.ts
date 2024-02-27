import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAdmitComponent } from './faculty-admit.component';

describe('FacultyAdmitComponent', () => {
  let component: FacultyAdmitComponent;
  let fixture: ComponentFixture<FacultyAdmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyAdmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyAdmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
