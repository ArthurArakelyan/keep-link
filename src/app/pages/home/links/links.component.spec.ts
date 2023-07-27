import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { LinksComponent } from './links.component';
import { LinkComponent } from '../link/link.component';

// Models
import { ILink } from '../../../core/models/link.model';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let compiled: HTMLElement;

  const createLink = (name = 'test', link = 'https://www.google.com/', image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png'): ILink => {
    return {
      id: Math.random().toString(),
      userId: '1',
      folderId: null,
      name,
      link,
      image,
      createdAt: 0,
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksComponent, LinkComponent],
      imports: [SharedModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    component.links = [createLink(), createLink('', ''), createLink('', '', ''), createLink('test', '', ''), createLink('', '', 'https://www.google.com/')];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the links', () => {
    const links = compiled.querySelectorAll('app-link');

    expect(links.length).toBe(component.links.length);

    links.forEach((link) => {
      expect(link).toBeInstanceOf(HTMLElement);
    });
  });
});
