import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    });

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the loader', () => {
    const svg = compiled.querySelector('svg');
    const circle = compiled.querySelector('circle');

    expect(svg).toBeInstanceOf(SVGSVGElement);
    expect(circle).toBeInstanceOf(SVGCircleElement);
  });

  it('should have a size in className', () => {
    const newSize = 'small';

    component.size = newSize;

    fixture.detectChanges();

    expect(compiled.className.includes(newSize)).toBeTrue();
  });
});
