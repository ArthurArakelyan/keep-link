import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

// Module
import { SharedModule } from '../../../shared/shared.module';

// Components
import { AddLinkComponent } from './add-link.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import { selectLink } from '../../../store/link';
import { selectFolder } from '../../../store/folder';

describe('AddLinkComponent', () => {
  let component: AddLinkComponent;
  let fixture: ComponentFixture<AddLinkComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLinkComponent],
      imports: [ReactiveFormsModule, SharedModule, RouterTestingModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(AddLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the add link modal', () => {
    expect(compiled.querySelector('app-modal')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.add-link')).toBeInstanceOf(HTMLDivElement);
    expect(compiled.querySelector('app-select.add-link__select')).toBeInstanceOf(HTMLElement);
  });

  it('should show link form when the type is link', () => {
    component.type = 'link';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-link')!;

    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form.querySelector('app-select')).toBeInstanceOf(HTMLElement);
    expect(form.querySelector('app-input #link-name')).toBeInstanceOf(HTMLInputElement);
    expect(form.querySelector('app-input #link-url')).toBeInstanceOf(HTMLInputElement);
    expect(form.querySelector('app-button button[type="submit"]')).toBeInstanceOf(HTMLButtonElement)
  });

  it('should show folder form when the type is form', () => {
    component.type = 'folder';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-folder')!;

    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form.querySelector('app-input #folder-name')).toBeInstanceOf(HTMLInputElement);
    expect(form.querySelector('app-input #folder-description')).toBeInstanceOf(HTMLInputElement);
    expect(form.querySelector('app-button button[type="submit"]')).toBeInstanceOf(HTMLButtonElement)
  });

  it('should not be possible to submit when the link form is invalid', () => {
    component.type = 'link';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-link')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.linkForm.setValue({
      name: '',
      link: 'google',
      folderId: null,
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectLink)
      .subscribe((linkState) => {
        expect(linkState.loading.addLink).toBeFalse();
      });
  });

  it('should be possible to submit when the link form form is valid', () => {
    component.type = 'link';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-link')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.linkForm.setValue({
      name: 'Name',
      link: 'https://google.com',
      folderId: null,
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectLink)
      .subscribe((linkState) => {
        expect(linkState.loading.addLink).toBeTrue();
      });
  });

  it('should not be possible to submit when the folder form form is invalid', () => {
    component.type = 'folder';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-folder')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.folderForm.setValue({
      name: '',
      description: '',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectFolder)
      .subscribe((linkState) => {
        expect(linkState.loading.addFolder).toBeFalse();
      });
  });

  it('should be possible to submit when the folder form form is valid', () => {
    component.type = 'folder';

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-folder')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.folderForm.setValue({
      name: 'Name',
      description: 'Description',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectFolder)
      .subscribe((linkState) => {
        expect(linkState.loading.addFolder).toBeTrue();
      });
  });

  it('should not be possible to submit when the edit folder form form is invalid', () => {
    component.type = 'folder';
    component.folder = {
      name: 'Name',
      description: null,
      createdAt: 0,
      userId: '1',
      id: '1',
    };

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-folder')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.folderForm.setValue({
      name: '',
      description: '',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectFolder)
      .subscribe((linkState) => {
        expect(linkState.loading.editFolder).toBeFalse();
      });
  });

  it('should be possible to submit when the edit folder form form is valid', () => {
    component.type = 'folder';
    component.folder = {
      name: 'Name',
      description: null,
      createdAt: 0,
      userId: '1',
      id: '1',
    };

    fixture.detectChanges();

    const form = compiled.querySelector('.add-link__form-folder')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    component.folderForm.setValue({
      name: 'Name',
      description: 'Description',
    });

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    store.select(selectFolder)
      .subscribe((linkState) => {
        expect(linkState.loading.editFolder).toBeTrue();
      });
  });
});
