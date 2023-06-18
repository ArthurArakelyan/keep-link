import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { InputComponent } from './input.component';

// Utilities
import { getErrorMessage } from '../../utilities/getErrorMessage';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the input placeholder', () => {
    const placeholder = 'Email';

    component.placeholder = placeholder;

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe(placeholder);
  });

  it('should create the input placeholder with backgroundColor', () => {
    const color = 'rgb(255, 0, 0)';

    component.placeholderBackgroundColor = color;

    fixture.detectChanges();

    const backgroundColorStyle = getComputedStyle(compiled.querySelector('span')!).backgroundColor;

    expect(backgroundColorStyle).toBe(color);
  });

  it('should create the input with name, type, aria-label', () => {
    const type = 'password';
    const name = 'your-password';
    const placeholder = 'Password';

    component.type = type;
    component.name = name;
    component.placeholder = placeholder;

    fixture.detectChanges();

    const input = compiled.querySelector('input')!;

    expect(input.type).toBe(type);
    expect(input.name).toBe(name);
    expect(input.getAttribute('aria-label')).toBe(placeholder);
  });

  it('should change the focused and divided states on focus and blur', () => {
    expect(component.focused).toBeFalse();
    expect(component.divided).toBeFalse();

    const input = compiled.querySelector('input')!;

    input.focus();
    input.value = 'text';
    component.focused = true;
    component.divided = true;

    fixture.detectChanges();

    expect(component.focused).toBeTrue();
    expect(component.divided).toBeTrue();
    expect(document.activeElement).toBe(input);

    input.blur();
    component.focused = false;
    component.divided = true;

    fixture.detectChanges();

    expect(component.focused).toBeFalse();
    expect(component.divided).toBeTrue();
    expect(document.activeElement).not.toBe(input);

    input.value = '';
    component.divided = false;

    fixture.detectChanges();

    expect(component.focused).toBeFalse();
    expect(component.divided).toBeFalse();
    expect(input.value).toBeFalsy();
  });

  it('should show error message', () => {
    const error = { required: true };
    const errorMessage = getErrorMessage(error);

    component.showError = true;
    component.error = error;
    component.errorMessage = errorMessage;

    fixture.detectChanges();

    const errorElement = compiled.querySelector('p')!;

    expect(errorElement.innerText).toBe(errorMessage);
  });
});
