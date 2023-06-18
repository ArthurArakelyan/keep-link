import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, LoginRoutingModule, SharedModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the login', () => {
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
