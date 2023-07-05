import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ConfirmModalComponent } from './confirm-modal.component';

import createSpy = jasmine.createSpy;

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ConfirmModalComponent],
    });

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the confirm modal', () => {
    expect(compiled.querySelector('app-modal')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.confirm-modal-text')).toBeInstanceOf(HTMLParagraphElement);
    expect(compiled.querySelector('.confirm-modal-actions__cancel')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.confirm-modal-actions__cancel')!.textContent!.includes(component.cancelText)).toBeTrue();
    expect(compiled.querySelector('.confirm-modal-actions__submit')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.confirm-modal-actions__submit')!.textContent!.includes(component.submitText)).toBeTrue();
  });

  it('should trigger close on cancel click', () => {
    const spy = createSpy();

    component.confirmModalClose.subscribe(spy);

    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('.confirm-modal-actions__cancel button')!.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger submit on submit click', () => {
    const spy = createSpy();

    component.confirmModalSubmit.subscribe(spy);

    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('.confirm-modal-actions__submit button')!.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not be able to trigger submit or close during loading', () => {
    const spySubmit = createSpy();
    const spyCancel = createSpy();

    component.confirmModalSubmit.subscribe(spySubmit);
    component.confirmModalClose.subscribe(spyCancel);

    component.loading = true;

    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('.confirm-modal-actions__submit button')!.click();
    compiled.querySelector<HTMLButtonElement>('.confirm-modal-actions__cancel button')!.click();

    expect(spySubmit).not.toHaveBeenCalled();
    expect(spyCancel).not.toHaveBeenCalled();
  });
});
