import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../shared/shared.module';

// Components
import { FoldersComponent } from './folders.component';
import { FolderComponent } from './folder/folder.component';
import { LinkComponent } from '../link/link.component';

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
      name,
      link,
      image,
    };
  };

  const createFolder = (name = 'test', description = 'test', links = [createLink(), createLink('', ''), createLink('', '', ''), createLink('test', '', ''), createLink('', '', 'https://www.google.com/')]): IFolder => {
    return {
      id: Math.random().toString(),
      name,
      description,
      links,
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoldersComponent, FolderComponent, LinkComponent],
      imports: [SharedModule],
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
