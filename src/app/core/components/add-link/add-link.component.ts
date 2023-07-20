import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Constants
import { VALIDATION_LENGTHS } from '../../constants/validation';

// Validators
import { urlValidator } from '../../validators/url.validator';

// Models
import { IOption } from '../../models/option.model';

@Component({
  selector: 'app-add-link',
  templateUrl: 'add-link.component.html',
  styleUrls: ['add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, OnDestroy {
  open: boolean = false;
  loading: boolean = false;
  submitted: boolean = false;
  type: string | null = 'link';

  readonly linkForm = new FormGroup({
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.open = queryParams['addLink'] !== undefined;
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
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
        },
      },
    );

    this.submitted = false;
    this.loading = false;
    this.type = 'link';

    this.linkForm.reset();
    this.folderForm.reset();
  }

  onLinkSubmit() {
    this.submitted = true;

    if (this.linkForm.invalid) {
      return;
    }

    this.onClose();
  }

  onFolderSubmit() {
    this.submitted = true;

    if (this.folderForm.invalid) {
      return;
    }

    this.onClose();
  }

  onSelectType(type: string | null) {
    this.type = type;
  }
}
