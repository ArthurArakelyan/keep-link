import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../core.module';

// Components
import { SideMenuResponsiveComponent } from './side-menu-responsive.component';

describe('SideMenuResponsiveComponent', () => {
  let component: SideMenuResponsiveComponent;
  let fixture: ComponentFixture<SideMenuResponsiveComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuResponsiveComponent],
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule, CoreModule],
    });

    fixture = TestBed.createComponent(SideMenuResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the responsive side menu', () => {
    expect(component).toBeTruthy();
  });

  it('should render the side menu when open is true', () => {
    component.open = true;

    fixture.detectChanges();

    expect(compiled.querySelector('.side-menu-responsive')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-side-menu')).toBeInstanceOf(HTMLElement);
  });

  it('should have aria-hidden when open is false', () => {
    expect(compiled.getAttribute('aria-hidden')).toBeTruthy();

    component.open = true;

    fixture.detectChanges();

    expect(compiled.getAttribute('aria-hidden')).toBeFalsy();
  });
});
