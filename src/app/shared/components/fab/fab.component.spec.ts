import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { FabComponent } from './fab.component';

// Services
import { SizeService } from '../../../core/services/size.service';

// Models
import { ISize } from '../../../core/models/size.model';

describe('FabComponent', () => {
  let component: FabComponent;
  let fixture: ComponentFixture<FabComponent>;
  let compiled: HTMLElement;
  let sizeServiceStub: Partial<SizeService>;

  beforeEach(() => {
    sizeServiceStub = {
      size$: new BehaviorSubject<ISize>({
        _1000: true,
        _768: true,
        _600: true,
      }),
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [FabComponent],
      providers: [
        { provide: SizeService, useValue: sizeServiceStub },
      ],
    });

    fixture = TestBed.createComponent(FabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the fab', () => {
    expect(compiled.querySelector('app-button')).toBeInstanceOf(HTMLElement);
  });

  it('should listen for clicks', () => {
    spyOn(component.fabClick, 'emit');

    compiled.querySelector('button')?.click();

    fixture.detectChanges();

    expect(component.fabClick.emit).toHaveBeenCalled();
  });

  it('should not show the fab when the screen width is greater than 768', () => {
    sizeServiceStub.size$?.next({
      _1000: false,
      _768: false,
      _600: false,
    });

    fixture.detectChanges();

    expect(compiled.querySelector('app-button')).toBeNull();
  });
});
