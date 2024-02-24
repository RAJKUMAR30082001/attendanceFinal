import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFaceRegisterComponent } from './student-face-register.component';

describe('StudentFaceRegisterComponent', () => {
  let component: StudentFaceRegisterComponent;
  let fixture: ComponentFixture<StudentFaceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFaceRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFaceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
