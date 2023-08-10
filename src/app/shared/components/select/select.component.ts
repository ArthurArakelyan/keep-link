import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

// Utilities
import { getErrorMessage } from '../../../core/utilities/get-error-message';

// Constants
import { keys } from '../../../core/constants/keys';

// Animations
import { fadeTranslateInOut } from '../../../core/animations/fade-translate-in-out.animation';
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';

// Models
import { IOption } from '../../../core/models/option.model';

@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SelectComponent)
  }],
  animations: [fadeTranslateInOut, fadeInOut],
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  value: IOption | null = null;
  open: boolean = false;
  errorMessage: string = '';
  verticalPosition: 'top' | 'bottom' = 'bottom';
  focused: number = -1;
  searchValue: string = '';

  private readonly maxHeight: number = 232;

  @Input({ required: true }) options: IOption[] = [];
  @Input({ required: true }) placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() showError: boolean = false;
  @Input() error: ValidationErrors | null | undefined;
  @Input() placeholderBackgroundColor: string = 'var(--background-color)';
  @Input() defaultValue: string = '';
  @Input() canSelectNothing: boolean = true;
  @Input() showSearch: boolean = false;

  @Output() selectOption = new EventEmitter<string | null>();
  @Output() search = new EventEmitter<string>();

  get containerId() { return `${this.placeholder}-container`; }
  get labelId() { return `${this.placeholder}-label`; }

  @HostBinding('class.open') get classOpen() { return this.open; }
  @HostBinding('class.selected') get classSelected() { return this.value !== null; }
  @HostBinding('class.error') get classError() { return this.showError && this.errorMessage; }
  @HostBinding('class.top') get classTop() { return this.verticalPosition === 'top'; }
  @HostBinding('class.bottom') get classBottom() { return this.verticalPosition === 'bottom'; }

  @HostListener('document:click', ['$event'])
  private onGlobalClick(event: MouseEvent): void {
    if (this.open && !this.element.nativeElement.contains(<HTMLElement>event.target)) {
      this.closeSelect();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onGlobalKeyDown(e: KeyboardEvent) {
    if (e.key === keys.esc && this.open) {
      this.closeSelect();
    }

    if (e.key === keys.arrowDown || e.key === keys.arrowUp) {
      e.preventDefault();
      this.onArrow(e.key);
    }
  }

  constructor(
    private element: ElementRef<HTMLElement>,
  ) {}

  ngOnInit() {
    this.initializeDefaultValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['error']) {
      const error = getErrorMessage(changes['error'].currentValue);

      if (error) {
        this.errorMessage = error;
      }
    }
  }

  onClick() {
    this.toggleSelect();
  }

  onSelect(value: IOption) {
    this.value = (this.canSelectNothing && (this.value?.key === value.key)) ? null : value;

    this.onChange(this.value ? this.value.key : null);

    this.selectOption.emit(this.value ? this.value.key : null);

    this.closeSelect();
  }

  onSearchInput(e: Event) {
    this.searchValue = (<HTMLInputElement>e.target).value;
    this.search.emit(this.searchValue);
  }

  toggleSelect() {
    this.open ? this.closeSelect() : this.openSelect();
  }

  private onArrow(arrow: string) {
    if (document.activeElement) {
      const buttons = this.element.nativeElement.querySelectorAll('app-option button');

      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] === document.activeElement) {
          this.focused = i;
          break;
        }
      }
    }

    if (arrow === keys.arrowUp) {
      if (this.focused > 0) {
        this.focused -= 1;
      } else {
        this.focused = this.options.length - 1;
      }
    } else if (arrow === keys.arrowDown) {
      if (this.focused >= (this.options.length - 1)) {
        this.focused = 0;
      } else {
        this.focused += 1;
      }
    }
  }

  private openSelect() {
    if (this.disabled) {
      return;
    }

    this.calculateVerticalPosition();

    this.open = true;

    setTimeout(() => {
      this.scrollToOption();
    }, 0);
  }

  private closeSelect() {
    this.open = false;
    this.focused = -1;
  }

  private calculateVerticalPosition() {
    try {
      const { top, height } = this.element.nativeElement.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      this.verticalPosition = (height + top + this.maxHeight) > screenHeight
        ? 'top'
        : 'bottom';
    } catch (e) {
      console.error(e);
    }
  }

  private scrollToOption() {
    if (!this.value || this.options.length <= 6) {
      return;
    }

    const selectedOption = this.element.nativeElement.querySelector('app-option[selected]');

    if (selectedOption) {
      selectedOption.scrollIntoView();
    }
  }

  private initializeDefaultValue() {
    if (!this.defaultValue) {
      return;
    }

    const foundOption = this.options.find((option) => option.key === this.defaultValue);

    if (foundOption) {
      this.value = foundOption;
    }
  }

  onChange(value: string | null) {}

  onTouched() {}

  writeValue(value: string) {
    this.value = this.options.find((option) => option.key === value) || null;
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
