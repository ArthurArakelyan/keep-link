import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { addLink, editLink, selectLink } from '../../../store/link';
import { addFolder, editFolder, selectFolder } from '../../../store/folder';

// Constants
import { VALIDATION_LENGTHS } from '../../constants/validation';

// Validators
import { urlValidator } from '../../validators/url.validator';

// Models
import { IOption } from '../../models/option.model';
import { ILink, ILinkWithoutId } from '../../models/link.model';
import { IFolder } from '../../models/folder.model';
import { IOptionalId } from '../../models/id.model';

@Component({
  selector: 'app-add-link',
  templateUrl: 'add-link.component.html',
  styleUrls: ['add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, OnDestroy {
  folderOptions: IOption[] = [];
  folders: IFolder[] = [];
  links: ILink[] = [];

  submitted: boolean = false;
  type: 'link' | 'folder' = 'link';
  link: ILink | null = null;
  folder: IFolder | null = null;

  addLinkLoading: boolean = false;
  editLinkLoading: boolean = false;
  addFolderLoading: boolean = false;
  editFolderLoading: boolean = false;

  get modalTitle() {
    return `${(this.type === 'link' && this.link) || (this.type === 'folder' && this.folder) ? 'Edit' : 'Add'} ${this.type === 'link' ? 'Link' : 'Folder'}`;
  }

  readonly linkForm = new FormGroup({
    folderId: new FormControl<string | null>(null),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(VALIDATION_LENGTHS.base)],
    }),
    link: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(VALIDATION_LENGTHS.long), urlValidator],
    }),
  });

  readonly folderForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(VALIDATION_LENGTHS.base)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(VALIDATION_LENGTHS.long)],
    }),
  });

  readonly typeOptions: IOption[] = [
    {
      key: 'link',
      value: 'Link',
      icon: 'link',
    },
    {
      key: 'folder',
      value: 'Folder',
      icon: 'folder',
    },
  ];

  private queryParamsSubscription: Subscription | undefined;
  private linkStoreSubscription: Subscription | undefined;
  private folderStoreSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.linkStoreSubscription = this.store.select(selectLink).subscribe((linkState) => {
      this.links = linkState.list;

      if (
        (this.addLinkLoading && !linkState.loading.addLink) ||
        (this.editLinkLoading && !linkState.loading.editLink)
      ) {
        this.onClose();
      }

      this.addLinkLoading = linkState.loading.addLink;
      this.editLinkLoading = linkState.loading.editLink;
    });

    this.folderStoreSubscription = this.store.select(selectFolder).subscribe((folderState) => {
      this.folderOptions = folderState.list.map((folder) => {
        return {
          key: folder.id,
          value: folder.name,
        };
      });

      this.folders = folderState.list;

      if (
        (this.addFolderLoading && !folderState.loading.addFolder) ||
        (this.editFolderLoading && !folderState.loading.editFolder)
      ) {
        this.onClose();
      }

      this.addFolderLoading = folderState.loading.addFolder;
      this.editFolderLoading = folderState.loading.editFolder;
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      // folder
      const linkFolder = queryParams['linkFolder'];

      if (linkFolder) {
        this.linkForm.controls.folderId.setValue(linkFolder);
      }

      // edit
      const link = queryParams['link'];
      const folder = queryParams['folder'];

      if (link) {
        this.type = 'link';
        this.link = this.links.find((l) => l.id === link) || null;

        if (this.link) {
          this.linkForm.setValue({
            folderId: this.link.folderId || null,
            name: this.link.name,
            link: this.link.link,
          });
        }
      } else if (folder) {
        this.type = 'folder';
        this.folder = this.folders.find((f) => f.id === folder) || null;

        if (this.folder) {
          this.folderForm.setValue({
            name: this.folder.name,
            description: this.folder.description || '',
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
    this.linkStoreSubscription?.unsubscribe();
    this.folderStoreSubscription?.unsubscribe();
  }

  onClose() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        replaceUrl: true,
        queryParams: {
          addLink: undefined,
          linkFolder: undefined,
          link: undefined,
          folder: undefined,
        },
      },
    );
  }

  onLinkSubmit() {
    this.submitted = true;

    if (this.linkForm.invalid) {
      return;
    }

    const linkFormValue = this.linkForm.value;

    if (this.link) {
      const newLink: ILinkWithoutId = {
        ...this.link,
        name: linkFormValue.name!,
        link: linkFormValue.link!,
        folderId: linkFormValue.folderId!,
      };

      delete (<IOptionalId>newLink).id;

      this.store.dispatch(editLink({
        payload: {
          id: this.link.id,
          link: newLink,
        },
      }));
    } else {
      this.store.dispatch(addLink({
        payload: {
          name: linkFormValue.name!,
          link: linkFormValue.link!,
          folderId: linkFormValue.folderId!,
          image: '',
        },
      }));
    }
  }

  onFolderSubmit() {
    this.submitted = true;

    if (this.folderForm.invalid) {
      return;
    }

    const folderFormValue = this.folderForm.value;

    if (this.folder) {
      const newFolder: IFolder = {
        ...this.folder,
        name: folderFormValue.name!,
        description: folderFormValue.description!,
      };

      delete (<IOptionalId>newFolder).id;

      this.store.dispatch(editFolder({
        payload: {
          id: this.folder.id,
          folder: newFolder,
        },
      }));
    } else {
      this.store.dispatch(addFolder({
        payload: {
          name: folderFormValue.name!,
          description: folderFormValue.description!,
        },
      }));
    }
  }

  onSelectType(type: string | null) {
    this.type = <typeof this.type>type!;
  }
}
