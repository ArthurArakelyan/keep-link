import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../../shared/shared.module';

// Components
import { LinkComponent } from '../../link/link.component';
import { FolderModalComponent } from './folder-modal.component';
import { FolderModalActionsBarComponent } from './folder-modal-actions-bar/folder-modal-actions-bar.component';

// Store
import { appReducer, AppStore } from '../../../../store/app.reducer';
import { getFoldersFulfilled } from '../../../../store/folder';
import { getLinksFulfilled } from '../../../../store/link';

// Models
import { ILink } from '../../../../core/models/link.model';
import { IFolder } from '../../../../core/models/folder.model';

describe('FolderModalComponent', () => {
  let component: FolderModalComponent;
  let fixture: ComponentFixture<FolderModalComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  const createLink = (name = 'test', link = 'https://www.google.com/', image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png', folderId: string | null = null): ILink => {
    return {
      id: Math.random().toString(),
      userId: '1',
      folderId,
      name,
      link,
      image,
      createdAt: 0,
    };
  };

  const createFolder = (name = 'test', description = 'test', id = Math.random().toString()): IFolder => {
    return {
      userId: '1',
      id,
      name,
      description,
      createdAt: 0,
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkComponent, FolderModalComponent, FolderModalActionsBarComponent],
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer), BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(FolderModalComponent);
    component = fixture.componentInstance;
    component.folderId = '1';
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);

    store.dispatch(getLinksFulfilled({ payload: [createLink('name', 'https://www.google.com/', '', '1'), createLink()] }));
    store.dispatch(getFoldersFulfilled({ payload: [createFolder(), createFolder('test', 'description', '1')] }));
    component.links = [createLink('name', 'https://www.google.com/', '', '1'), createLink()];

    fixture.detectChanges();
  });

  it('should create the folder modal', () => {
    expect(compiled.querySelector('app-modal')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.folder-modal-description')).toBeInstanceOf(HTMLParagraphElement);
    expect(compiled.querySelector('.folder-modal-links')).toBeInstanceOf(HTMLDivElement);
    expect(compiled.querySelector('app-link')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-folder-modal-actions-bar')).toBeInstanceOf(HTMLElement);
  });

  it('should not show the modal when there is no folder', () => {
    component.folder = null;
    component.folderId = null;

    fixture.detectChanges();

    expect(compiled.querySelector('app-modal')).toBeNull();
  });

  it('should not show the description when the folder doesn\'t have description', () => {
    if (component.folder) {
      component.folder = {
        ...component.folder,
        description: null,
      };
    }

    fixture.detectChanges();

    expect(compiled.querySelector('.folder-modal-description')).toBeNull();
  });
});
