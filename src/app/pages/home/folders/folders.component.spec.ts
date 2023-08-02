import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { FoldersComponent } from './folders.component';
import { FolderComponent } from './folder/folder.component';
import { LinkComponent } from '../link/link.component';

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
  let route: ActivatedRoute;

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

  const createFolder = (name = 'test', description = 'test', links = [createLink(), createLink('', ''), createLink('', '', ''), createLink('test', '', ''), createLink('', '', 'https://www.google.com/')]): IFolder => {
    return {
      userId: '1',
      id: Math.random().toString(),
      name,
      description,
      createdAt: 0,
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoldersComponent, FolderComponent, LinkComponent],
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer), BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(FoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    route = TestBed.get<ActivatedRoute>(ActivatedRoute);
    store = TestBed.get<Store>(Store);

    store.dispatch(getFoldersFulfilled({ payload: [createFolder(), createFolder('', '', [])] }));

    fixture.detectChanges();
  });

  it('should create the folders', () => {
    const folders = compiled.querySelectorAll('app-folder');

    expect(folders.length).toBe(component.alignedFolders.length);

    folders.forEach((folder) => {
      expect(folder).toBeInstanceOf(HTMLElement);
    });
  });

  it('should show the confirm modal when there is deleteFolder in queryParams', fakeAsync(() => {
    component.onDelete('1');

    tick();
    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeInstanceOf(HTMLElement);

    route.queryParams.subscribe((queryParams) => {
      expect(queryParams['deleteFolder']).toBeTruthy();
    });
  }));

  it('should not show the confirm modal when there is no deleteFolder in queryParams', fakeAsync(() => {
    component.onDelete('1');
    component.onDeleteCancel();

    tick();
    fixture.detectChanges();

    expect(compiled.querySelector('app-confirm-modal')).toBeNull();

    route.queryParams.subscribe((queryParams) => {
      expect(queryParams['deleteFolder']).toBeFalsy();
    });
  }));
});
