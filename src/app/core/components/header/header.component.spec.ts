import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the header', () => {
    expect(compiled.querySelector('.search__input')).toBeInstanceOf(HTMLInputElement);
    expect(compiled.querySelector('.search__icon')).toBeInstanceOf(SVGSVGElement);
    expect(compiled.querySelector('.avatar__image')).toBeInstanceOf(HTMLElement);
  });

  it('should focus the search input on icon click', () => {
    const input = compiled.querySelector<HTMLElement>('.search__input')!;
    const icon = compiled.querySelector<HTMLElement>('.search__icon')!;

    icon.dispatchEvent(new Event('click', { bubbles: true }));

    fixture.detectChanges();

    expect(document.activeElement).toBe(input);
  });
});
