import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Component
import { AvatarComponent } from './avatar.component';

// Utilities
import { timeout } from '../../../core/utilities/timeout';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let compiled: HTMLElement;

  // A blank image
  const defaultSrc = 'assets/avatar.png';
  const testSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    });

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the avatar', () => {
    expect(compiled.querySelector('img')).toBeInstanceOf(HTMLImageElement);
  });

  it('should render all image properties',  () => {
    const alt = 'test';
    const width = '40';
    const height = '40';

    component.avatarSrc = testSrc;
    component.alt = alt;
    component.width = width;
    component.height = height;

    fixture.detectChanges();

    const image = compiled.querySelector('img')!;

    expect(image.getAttribute('src')).toBe(testSrc);
    expect(image.getAttribute('alt')).toBe(alt);
    expect(image.getAttribute('width')).toBe(width);
    expect(image.getAttribute('height')).toBe(height);
  });

  it('should fallback to default image when the src is wrong', async(async () => {
    component.src = 'error';

    fixture.detectChanges();

    await timeout(100);

    fixture.detectChanges();

    const image = compiled.querySelector('img')!;

    expect(image.src.includes(defaultSrc)).toBeTrue();
  }));
});
