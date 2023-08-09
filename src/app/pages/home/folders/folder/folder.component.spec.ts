import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { SharedModule } from '../../../../shared/shared.module';

// Components
import { FolderComponent } from './folder.component';
import { LinkComponent } from '../../link/link.component';

// Store
import { appReducer, AppStore } from '../../../../store/app.reducer';
import { getLinksFulfilled } from '../../../../store/link';

// Constants
import { folderLinksMax } from '../../../../core/constants/count';

// Models
import { ILink } from '../../../../core/models/link.model';
import { IFolder } from '../../../../core/models/folder.model';

describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;
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
      declarations: [FolderComponent, LinkComponent],
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    component.folder = createFolder();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the folder', () => {
    expect(compiled.querySelector('.folder__name')).toBeInstanceOf(HTMLHeadingElement);
    expect(compiled.querySelector<HTMLHeadingElement>('.folder__name')!.innerText).toBe(component.folder.name);

    expect(compiled.querySelector('.folder__description')).toBeInstanceOf(HTMLParagraphElement);
    expect(compiled.querySelector<HTMLParagraphElement>('.folder__description')!.innerText).toBe(component.folder.name);

    expect(compiled.querySelector('.actions-bar__button app-edit-icon')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.actions-bar__button app-delete-icon')).toBeInstanceOf(HTMLElement);
  });

  it('should show the add new link button when the folder doesn\'t have any links', () => {
    expect(compiled.querySelector('.links-empty')).toBeInstanceOf(HTMLDivElement);
    expect(compiled.querySelector('app-button')).toBeInstanceOf(HTMLElement);
  });

  it ('should show the links when the folder has links', () => {
    component.links = [
      createLink(),
      createLink(),
    ];

    fixture.detectChanges();

    const links = compiled.querySelectorAll('.links app-link');

    expect(links.length).toBe(component.links.length);

    links.forEach((link) => {
      expect(link).toBeInstanceOf(HTMLElement);
    });
  });

  it(`should show the rest folders count when folders length is greater than ${folderLinksMax}`, () => {
    const links: ILink[] = [];
    const rest = 2;

    for (let i = 0; i < folderLinksMax; i++) {
      links.push(createLink());
    }

    component.links = links;
    component.restLinksCount = rest;

    fixture.detectChanges();

    expect(compiled.querySelectorAll('.links app-link').length).toBe(folderLinksMax);
    expect(compiled.querySelector('.links-rest')).toBeInstanceOf(HTMLButtonElement);
    expect(compiled.querySelector<HTMLSpanElement>('.links-rest__text')!.innerText).toContain(rest.toString());
  });
});
