import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { SelectComponent } from './select.component';

// Utilities
import { getErrorMessage } from '../../../core/utilities/get-error-message';
import { keys } from '../../../core/constants/keys';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [SharedModule, BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.placeholder = 'Placeholder';
    component.options = [
      {
        key: 'link',
        value: 'Link',
        icon: 'link',
      },
      {
        key: 'folder',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'folder2',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'folder3',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'folder4',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'folder5',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'folder6',
        value: 'Folder',
        icon: 'folder',
      },
      {
        key: 'long',
        value: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        icon: 'link',
      },
    ];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the select', () => {
    expect(compiled.querySelector('button.select')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('.select__placeholder')).toBeInstanceOf(HTMLSpanElement);
    expect(compiled.querySelector<HTMLSpanElement>('.select__placeholder')!.innerText).toBe(component.placeholder);
    expect(compiled.querySelector('app-chevron-down-icon')).toBeInstanceOf(HTMLElement);
  });

  it('should show the popup when it is open', () => {
    component.open = true;

    fixture.detectChanges();

    expect(compiled.querySelector('.select-options')).toBeInstanceOf(HTMLDivElement);

    const options = compiled.querySelectorAll('.select-options app-option');

    expect(options.length).toBe(component.options.length);

    options.forEach((option) => {
      expect(option).toBeInstanceOf(HTMLElement);
    });
  });

  it('should show the selected value', () => {
    component.value = component.options[0];

    fixture.detectChanges();

    expect(compiled.querySelector('.select__value')).toBeInstanceOf(HTMLDivElement);
    expect(compiled.querySelector('.select__value-name')).toBeInstanceOf(HTMLSpanElement);
    expect(compiled.querySelector('app-link-icon')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector<HTMLSpanElement>('.select__value-name')!.innerText).toBe(component.value.value);
  });

  it('should open and close on select click', () => {
    const select = compiled.querySelector<HTMLButtonElement>('.select')!;

    select.click();

    fixture.detectChanges();

    expect(component.open).toBeTrue();

    select.click();

    fixture.detectChanges();

    expect(component.open).toBeFalse();
  });

  it('should close the select on outside click', () => {
    component.open = true;

    fixture.detectChanges();

    expect(component.open).toBeTrue();

    document.body.click();

    fixture.detectChanges();

    expect(component.open).toBeFalse();
  });

  it('should close the select on esc click', () => {
    component.open = true;

    fixture.detectChanges();

    expect(component.open).toBeTrue();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.esc,
    }));

    fixture.detectChanges();

    expect(component.open).toBeFalse();
  });

  it('should change the value on option click', () => {
    component.open = true;

    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('app-option button')!.click();

    fixture.detectChanges();

    expect(component.value).toBe(component.options[0]);
  });

  it('should reset the value on selected option click', () => {
    component.open = true;
    component.value = component.options[0];

    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('app-option button')!.click();

    fixture.detectChanges();

    expect(component.value).toBeNull();
  });

  it('should change the focused option on arrow down/up click', () => {
    component.open = true;

    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.arrowDown,
    }));

    fixture.detectChanges();

    expect(component.focused).toBe(0);
  });

  it('should change the focused option to the latest on first option arrow up', () => {
    component.open = true;

    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.arrowUp,
    }));

    fixture.detectChanges();

    expect(component.focused).toBe(component.options.length - 1);
  });

  it('should change the focused option to the first on latest option arrow down', () => {
    component.open = true;

    fixture.detectChanges();

    for (let i = 0; i < (component.options.length + 1); i++) {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        key: keys.arrowDown,
      }));
    }

    fixture.detectChanges();

    expect(component.focused).toBe(0);
  });

  it('should show an error message', () => {
    const error = { required: true };
    const errorMessage = getErrorMessage(error);

    component.showError = true;
    component.error = error;
    component.errorMessage = errorMessage;

    fixture.detectChanges();

    const errorElement = compiled.querySelector<HTMLParagraphElement>('p.select-error')!;

    expect(errorElement.innerText).toBe(errorMessage);
  });

  it('show the search field', () => {
    component.open = true;
    component.showSearch = true;

    fixture.detectChanges();

    expect(compiled.querySelector('.select-options__search-input')).toBeInstanceOf(HTMLInputElement);
  });
});
