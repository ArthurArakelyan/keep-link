import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { FoldersComponent } from './folders.component';
import { FolderComponent } from './folder/folder.component';
import { LinkComponent } from '../link/link.component';

// Store
import { appReducer } from '../../../store/app.reducer';

// Models
import { IFolder } from '../../../core/models/folder.model';
import { ILink } from '../../../core/models/link.model';

describe('FoldersComponent', () => {
  let component: FoldersComponent;
  let fixture: ComponentFixture<FoldersComponent>;
  let compiled: HTMLElement;

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
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(FoldersComponent);
    component = fixture.componentInstance;
    component.folders = [createFolder(), createFolder('', '', [])];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the folders', () => {
    const folders = compiled.querySelectorAll('app-folder');

    expect(folders.length).toBe(component.folders.length);

    folders.forEach((folder) => {
      expect(folder).toBeInstanceOf(HTMLElement);
    });
  });
});
