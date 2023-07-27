import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

// Animations
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';

// Utilities
import { getErrorMessage } from '../../../core/utilities/get-error-message';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => InputComponent)
  }],
  animations: [fadeInOut],
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  focused: boolean = false;
  divided: boolean = false;
  errorMessage: string = '';
  value: string = '';

  @Input({ required: true }) placeholder: string = '';
  @Input() name: string = '';
  @Input() inputId: string | undefined;
  @Input() type: string = 'text';
  @Input() inputMode: string = 'text';
  @Input() error: ValidationErrors | null | undefined;
  @Input() showError: boolean = false;
  @Input() placeholderBackgroundColor: string = 'var(--background-color)';

  get labelId() { return `${this.inputId || this.placeholder}-label`; }

  @HostBinding('class.focus') get classFocus() { return this.focused; }
  @HostBinding('class.divide') get classDivide() { return this.divided; }
  @HostBinding('class.error') get classError() { return this.showError && this.errorMessage; }

  @ViewChild('input', { static: true }) inputElement: ElementRef<HTMLInputElement> | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['error']) {
      const error = getErrorMessage(changes['error'].currentValue);

      if (error) {
        this.errorMessage = error;
      }
    }
  }

  @HostListener('click')
  onHostClick() {
    if (this.inputElement?.nativeElement) {
      this.inputElement?.nativeElement.focus();
    }
  }

  onInput(e: Event) {
    const value = (<HTMLInputElement>e.target).value;

    this.value = value;

    this.onChange(value);
  }

  onFocus() {
    this.focused = true;
    this.divided = true;
  }

  onBlur() {
    this.onTouched();

    this.focused = false;

    if (!this.inputElement?.nativeElement?.value) {
      this.divided = false;
    }
  }

  onChange(value: string) {}

  onTouched() {}

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  writeValue(value: string) {
    this.value = value;

    if (value) {
      this.divided = true;
    }
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
