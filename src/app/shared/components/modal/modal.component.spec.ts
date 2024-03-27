import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';

// Constants
import { keys } from '../../../core/constants/keys';

import createSpy = jasmine.createSpy;

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, ModalHeaderComponent],
      imports: [SharedModule, BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the modal', () => {
    expect(compiled.querySelector('.modal-overlay')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.modal-content-wrapper')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.modal-content')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-modal-header')).toBeInstanceOf(HTMLElement);
  });

  it('should show loader when loading', () => {
    component.loading = true;

    fixture.detectChanges();

    expect(compiled.querySelector('app-loader')).toBeInstanceOf(HTMLElement);
  });

  it('should close the modal on esc click', () => {
    const spy = createSpy('close');

    component.modalClose.subscribe(spy);

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.esc,
    }));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should close the modal on overlay click', () => {
    const spy = createSpy('close');

    component.modalClose.subscribe(spy);

    compiled.querySelector<HTMLDivElement>('.modal-content-wrapper')!.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should not be able to close modal during loading', () => {
    const spy = createSpy('close');

    component.modalClose.subscribe(spy);

    component.loading = true;

    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: keys.esc,
    }));

    compiled.querySelector<HTMLDivElement>('.modal-content-wrapper')!.click();

    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
