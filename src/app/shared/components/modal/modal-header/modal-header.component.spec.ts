import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../shared.module';

// Components
import { ModalHeaderComponent } from './modal-header.component';

import createSpy = jasmine.createSpy;

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHeaderComponent],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(ModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the modal header', () => {
    expect(compiled.querySelector('.modal-header-title')).toBeInstanceOf(HTMLHeadingElement);
    expect(compiled.querySelector('.modal-header-close')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('app-close-icon')).toBeInstanceOf(HTMLElement);
  });

  it('should close on close button click', () => {
    const spy = createSpy();

    component.modalHeaderClose.subscribe(spy);

    compiled.querySelector<HTMLButtonElement>('.modal-header-close')!.click();

    expect(spy).toHaveBeenCalled();
  });
});
