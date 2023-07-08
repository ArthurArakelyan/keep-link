import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../shared.module';

// Components
import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionComponent],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    component.option = {
      key: 'link',
      value: 'Link',
      icon: 'link',
    };
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the option', () => {
    expect(compiled.querySelector('button.option')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('app-link-icon')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.option__name')).toBeInstanceOf(HTMLSpanElement);
    expect(compiled.querySelector<HTMLSpanElement>('.option__name')!.innerText).toBe(component.option.value);
  });

  it('should focus the option on passing focused property', () => {
    component.focused = true;

    fixture.detectChanges();

    expect(document.activeElement).toBe(compiled.querySelector('button.option'));
  });
});
