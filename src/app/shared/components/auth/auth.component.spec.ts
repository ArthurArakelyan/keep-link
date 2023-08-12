import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the auth container', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = 'Title';

    component.authTitle = title;

    fixture.detectChanges();

    expect(compiled.querySelector('h1')?.textContent).toBe(title);
  });
});
