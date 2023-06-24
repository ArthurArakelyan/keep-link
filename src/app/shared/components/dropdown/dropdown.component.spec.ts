import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { DropdownComponent } from './dropdown.component';

// Constants
import { keys } from '../../../core/constants/keys';

// Models
import { IDropdownOption } from '../../../core/models/dropdown-option.model';

import createSpy = jasmine.createSpy;

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [DropdownComponent],
    });

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the dropdown', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dropdown when the open is true', () => {
    component.open = true;

    fixture.detectChanges();

    expect(compiled.querySelector('.dropdown')).toBeInstanceOf(HTMLDivElement);
    expect(compiled.querySelector('.dropdown__content')).toBeInstanceOf(HTMLDivElement);
  });

  it('shouldn\'t render the dropdown when the open is false', () => {
    component.open = false;

    fixture.detectChanges();

    expect(compiled.querySelector('.dropdown')).toBeNull();
  });

  it('should open the dropdown on click', () => {
    expect(component.open).toBeFalse();

    compiled.click();

    fixture.detectChanges();

    expect(component.open).toBeTrue();
  });

  it('should open the dropdown on mouseenter', () => {
    expect(component.open).toBeFalse();

    compiled.dispatchEvent(new Event('mouseenter', { bubbles: true }));

    fixture.detectChanges();

    expect(component.open).toBeTrue();
  });

  it('should open the dropdown on enter when the element is active', () => {
    expect(component.open).toBeFalse();

    compiled.focus();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.enter,
    }));

    fixture.detectChanges();

    expect(component.open).toBeTrue();
  });

  it('should open the dropdown on space when the element is active', () => {
    expect(component.open).toBeFalse();

    compiled.focus();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.space,
    }));

    fixture.detectChanges();

    expect(component.open).toBeTrue();
  });

  it('should close the dropdown on outside click', () => {
    component.open = true;

    fixture.detectChanges();

    expect(component.open).toBeTrue();

    document.body.click();

    expect(component.open).toBeFalse();
  });

  it('should close the dropdown on mouseleave', () => {
    component.open = true;

    fixture.detectChanges();

    expect(component.open).toBeTrue();

    compiled.dispatchEvent(new Event('mouseleave', { bubbles: true }));

    fixture.detectChanges();

    expect(component.open).toBeFalse();
  });

  it('should close the dropdown on esc click', () => {
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

  it('should render options', () => {
    const mockAction = createSpy('action');

    const options: IDropdownOption[] = [
      {
        name: 'Option',
        icon: 'logout',
        action: mockAction,
      },
      {
        name: 'Option 2',
        icon: 'logout',
        action: mockAction,
      },
    ];

    component.options = options;

    fixture.detectChanges();

    component.open = true;

    fixture.detectChanges();

    const items = compiled.querySelectorAll<HTMLButtonElement>('.dropdown__item');

    items.forEach((item, index) => {
      const option = options[index];

      expect(item.querySelector('app-logout-icon')).toBeInstanceOf(HTMLElement);
      expect(item.querySelector<HTMLSpanElement>('.dropdown__item-name')!.innerText).toBe(option.name);
    });

    expect(mockAction).not.toHaveBeenCalled();

    items[0].click();

    expect(mockAction).toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.open).toBeFalse();
  });
});
