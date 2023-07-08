import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { LinkComponent } from './link.component';

// Pipes
import { ShortLinkPipe } from '../../../shared/pipes/short-link/short-link.pipe';

// Utilities
import { timeout } from '../../../core/utilities/timeout';

// Models
import { ILink } from '../../../core/models/link.model';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let compiled: HTMLElement;

  const createLink = (name = 'test', link = 'https://www.google.com/', image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png'): ILink => {
    return {
      id: Math.random().toString(),
      name,
      link,
      image,
    };
  };

  const shortLinkPipe = new ShortLinkPipe();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkComponent, ShortLinkPipe],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.link = createLink();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the link', () => {
    expect(compiled.querySelector('a')).toBeInstanceOf(HTMLAnchorElement);
    expect(compiled.querySelector<HTMLAnchorElement>('a')!.href).toBe(component.link.link);
    expect(compiled.querySelector('img.link__image')).toBeInstanceOf(HTMLImageElement);
    expect(compiled.querySelector('.link__info-name')).toBeInstanceOf(HTMLParagraphElement);
    expect(compiled.querySelector<HTMLParagraphElement>('.link__info-name')!.innerText).toBe(component.link.name);
    expect(compiled.querySelector('.link__info-link')).toBeInstanceOf(HTMLSpanElement);
    expect(compiled.querySelector<HTMLSpanElement>('.link__info-link')!.innerText).toBe(shortLinkPipe.transform(component.link.link));
    expect(compiled.querySelector('app-redirect-icon')).toBeInstanceOf(HTMLElement);

    component.action = 'menu';

    fixture.detectChanges();

    expect(compiled.querySelector('app-dropdown')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-menu-icon')).toBeInstanceOf(HTMLElement);

    component.link.image = undefined;

    fixture.detectChanges();

    expect(compiled.querySelector('.link__image')).toBeNull();
    expect(compiled.querySelector('app-web-icon')).toBeInstanceOf(HTMLElement);
  });

  it('should fallback to default icon when the image is wrong', async(async () => {
    component.link.image = 'error';

    fixture.detectChanges();

    await timeout(200);

    fixture.detectChanges();

    expect(compiled.querySelector('.link__image')).toBeNull();
    expect(compiled.querySelector('app-web-icon')).toBeInstanceOf(HTMLElement);
  }));
});
