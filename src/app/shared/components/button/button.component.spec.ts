import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ButtonComponent],
    });

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the button', () => {
    expect(compiled.querySelector('button')).toBeInstanceOf(HTMLButtonElement);
  });

  it('should listen for clicks', () => {
    spyOn(component.buttonClick, 'emit');

    compiled.querySelector('button')?.click();

    fixture.detectChanges();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should have a type', () => {
    const type = 'submit'

    component.type = type;

    fixture.detectChanges();

    const buttonType = compiled.querySelector('button')?.type;

    expect(buttonType).toBe(type);
  });

  it('should create ripple effects on mouse down', () => {
    const button = compiled.querySelector('button')!;

    button.dispatchEvent(new Event('mousedown'));

    fixture.detectChanges();

    const ripple = button.querySelector('div')?.className.includes('ripple');

    expect(ripple).toBeTruthy();
  });

  it('should not be clickable when it is loading', () => {
    spyOn(component.buttonClick, 'emit');

    component.loading = true;

    fixture.detectChanges();

    const button = compiled.querySelector('button')!;

    button.click();

    fixture.detectChanges();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should not be clickable when it is disabled', () => {
    spyOn(component.buttonClick, 'emit');

    component.disabled = true;

    fixture.detectChanges();

    const button = compiled.querySelector('button')!;

    button.click();

    fixture.detectChanges();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });
});
