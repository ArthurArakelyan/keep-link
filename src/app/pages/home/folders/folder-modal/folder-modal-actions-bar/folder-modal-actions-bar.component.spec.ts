import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { FolderModalActionsBarComponent } from './folder-modal-actions-bar.component';

describe('FolderModalActionsBarComponent', () => {
  let component: FolderModalActionsBarComponent;
  let fixture: ComponentFixture<FolderModalActionsBarComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderModalActionsBarComponent],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(FolderModalActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the folder modal actions bar', () => {
    expect(compiled.querySelectorAll('.folder-modal-actions-bar__button').length).toBeGreaterThan(0);
  });
});
