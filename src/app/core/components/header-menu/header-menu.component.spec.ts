import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { HeaderMenuComponent } from './header-menu.component';

// Services
import { SideMenuService } from '../../services/side-menu.service';

import createSpy = jasmine.createSpy;

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;
  let compiled: HTMLElement;

  const sideMenuServiceStub: Partial<SideMenuService> = {
    open: createSpy('open'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: SideMenuService, useValue: sideMenuServiceStub },
      ],
    });

    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the header menu', () => {
    expect(compiled.querySelector('button')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector('app-burger-menu-icon')).toBeInstanceOf(HTMLElement);
  });

  it('should open the side menu on click', () => {
    compiled.querySelector<HTMLButtonElement>('button')!.click();

    expect(sideMenuServiceStub.open).toHaveBeenCalled();
  });
});
