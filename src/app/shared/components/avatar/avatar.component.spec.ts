import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Component
import { AvatarComponent } from './avatar.component';

// Utilities
import { timeout } from '../../../core/utilities/timeout';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let compiled: HTMLElement;

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

    component.name = 'Test';
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

  it('should show the avatar image when the src is correct', () => {
    component.avatarSrc = testSrc;

    fixture.detectChanges();

    expect(compiled.querySelector('img')!.className.includes('avatar--hidden')).toBeFalse();
    expect(compiled.querySelector('.avatar-letter')).toBeNull();
  });

  it('should fallback to letter avatar when the src is wrong', async(async () => {
    component.src = 'error';
    component.name = 'Test';

    fixture.detectChanges();

    await timeout(200);

    fixture.detectChanges();

    expect(compiled.querySelector('img')!.className.includes('avatar--hidden')).toBeTrue();
    expect(compiled.querySelector('.avatar-letter')).toBeInstanceOf(HTMLDivElement);
  }));

  it('should not show anything when the src is wrong and name is not provided', async(async () => {
    component.src = 'error';
    component.name = '';

    fixture.detectChanges();

    await timeout(200);

    fixture.detectChanges();

    expect(compiled.querySelector('img')!.className.includes('avatar--hidden')).toBeTrue();
    expect(compiled.querySelector('.avatar-letter')).toBeNull();
  }));
});
