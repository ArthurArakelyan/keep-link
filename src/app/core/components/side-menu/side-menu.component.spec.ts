import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { SideMenuComponent } from './side-menu.component';

// Constants
import { navLinks } from '../../constants/nav-links';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [SharedModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the side menu', () => {
    expect(compiled.querySelector('.side-menu-header img')).toBeInstanceOf(HTMLImageElement);
    expect(compiled.querySelector('.side-menu__add-button')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.side-menu__links')).toBeInstanceOf(HTMLUListElement);
    expect(compiled.querySelectorAll('.side-menu__link-wrapper').length).toBe(navLinks.length);
  });
});
