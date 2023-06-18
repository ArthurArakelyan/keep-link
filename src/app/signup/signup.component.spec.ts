import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, SignupRoutingModule, SharedModule],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the signup', () => {
    const authContainer = compiled.querySelector('app-auth');
    const form = compiled.querySelector('form');
    const inputs = compiled.querySelectorAll('app-input');
    const submitButton = compiled.querySelector('button[type="submit"]');

    expect(authContainer).toBeTruthy();
    expect(form).toBeTruthy();
    expect(submitButton).toBeTruthy();

    inputs.forEach((input) => {
      expect(input).toBeTruthy();
    });
  });
});
