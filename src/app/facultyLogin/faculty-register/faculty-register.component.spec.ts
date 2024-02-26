import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRegisterComponent } from './faculty-register.component';

describe('FacultyRegisterComponent', () => {
  let component: FacultyRegisterComponent;
  let fixture: ComponentFixture<FacultyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
