import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyLoginPageComponent } from './faculty-login-page.component';

describe('FacultyLoginPageComponent', () => {
  let component: FacultyLoginPageComponent;
  let fixture: ComponentFixture<FacultyLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
