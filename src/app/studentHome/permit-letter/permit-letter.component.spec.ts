import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitLetterComponent } from './permit-letter.component';

describe('PermitLetterComponent', () => {
  let component: PermitLetterComponent;
  let fixture: ComponentFixture<PermitLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermitLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
