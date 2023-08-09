import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { FoldersComponent } from './folders.component';
import { FolderComponent } from './folder/folder.component';
import { LinkComponent } from '../link/link.component';
import { FolderModalComponent } from './folder-modal/folder-modal.component';
import { FolderModalActionsBarComponent } from './folder-modal/folder-modal-actions-bar/folder-modal-actions-bar.component';

// Store
import { appReducer, AppStore } from '../../../store/app.reducer';
import { getFoldersFulfilled } from '../../../store/folder';

// Models
import { IFolder } from '../../../core/models/folder.model';
import { ILink } from '../../../core/models/link.model';

describe('FoldersComponent', () => {
  let component: FoldersComponent;
  let fixture: ComponentFixture<FoldersComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

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

  const createFolder = (name = 'test', description = 'test', links = [createLink(), createLink('', ''), createLink('', '', ''), createLink('test', '', ''), createLink('', '', 'https://www.google.com/')], id = Math.random().toString()): IFolder => {
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
      declarations: [FoldersComponent, FolderComponent, LinkComponent, FolderModalComponent, FolderModalActionsBarComponent],
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer), BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(FoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);

    store.dispatch(getFoldersFulfilled({ payload: [createFolder(), createFolder('', '', [], '1')] }));

    fixture.detectChanges();
  });

  it('should create the folders', () => {
    const folders = compiled.querySelectorAll('app-folder');

    expect(folders.length).toBe(component.alignedFolders.length);

    folders.forEach((folder) => {
      expect(folder).toBeInstanceOf(HTMLElement);
    });
  });

  it('should show the folder modal when there is folderId in queryParams and there is no hideFolder in queryParams', () => {
    component.folderId = '1';
    component.hideFolder = false;

    fixture.detectChanges();

    expect(compiled.querySelector('app-folder-modal')).toBeInstanceOf(HTMLElement);
  });

  it('should not show the folder modal when there is no folderId in queryParams', () => {
    component.folderId = null;
    component.hideFolder = false;

    fixture.detectChanges();

    expect(compiled.querySelector('app-folder-modal')).toBeNull();
  });

  it('should not show the folder modal when there is folderId in queryParams and hideFolder', () => {
    component.folderId = '1';
    component.hideFolder = true;

    fixture.detectChanges();

    expect(compiled.querySelector('app-folder-modal')).toBeNull();
  });

  it('should show the confirm modal when there is deleteFolder in queryParams', () => {
    component.deleteId = '1';

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeInstanceOf(HTMLElement);
  });

  it('should not show the confirm modal when there is no deleteFolder in queryParams', () => {
    component.deleteId = null;

    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeNull();
  });
});
