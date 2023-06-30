import { ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { SharedModule } from '../../../../shared/shared.module';

// Components
import { FolderComponent } from './folder.component';
import { LinkComponent } from '../../link/link.component';

// Models
import { ILink } from '../../../../core/models/link.model';
import { IFolder } from '../../../../core/models/folder.model';

describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;
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
      declarations: [FolderComponent, LinkComponent],
      imports: [SharedModule],
    });

    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    component.folder = createFolder();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the folder', () => {
    expect(compiled.querySelector('.folder__name')).toBeInstanceOf(HTMLHeadingElement);
    expect(compiled.querySelector<HTMLHeadingElement>('.folder__name')!.innerText).toBe(component.folder.name);

    expect(compiled.querySelector('.folder__description')).toBeInstanceOf(HTMLParagraphElement);
    expect(compiled.querySelector<HTMLParagraphElement>('.folder__description')!.innerText).toBe(component.folder.name);

    expect(compiled.querySelector('.actions-bar__button app-edit-icon')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('.actions-bar__button app-delete-icon')).toBeInstanceOf(HTMLElement);

    const links = compiled.querySelectorAll('.links app-link');

    expect(links.length).toBe(component.folder.links.length);

    links.forEach((link) => {
      expect(link).toBeInstanceOf(HTMLElement);
    });
  });
});
