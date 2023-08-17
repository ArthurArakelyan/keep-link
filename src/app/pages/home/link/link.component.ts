import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Utilities
import { copy } from '../../../core/utilities/copy';

// Animations
import { linkHighlight } from '../../../core/animations/link-highlight.animation';

// Models
import { ILink } from '../../../core/models/link.model';
import { IDropdownOption } from '../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-link',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.scss'],
  animations: [linkHighlight],
})
export class LinkComponent implements OnInit, OnDestroy {
  imageError: boolean = false;
  linkHighlight: boolean = false;

  dropdownOptions: IDropdownOption[] = [
    {
      name: 'Copy',
      icon: 'copy',
      action: () => this.onCopy(),
    },
    {
      name: 'Edit',
      icon: 'edit',
      action: () => this.onEdit(),
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: () => this.onDelete(),
    },
  ];

  private highlightTimeout: ReturnType<typeof setTimeout> | undefined;
  private fragmentSubscription: Subscription | undefined;

  @Input({ required: true }) link!: ILink;
  @Input() action: 'menu' | null  = null;
  @Input() imageClass: string | undefined;
  @Input() imageWrapperClass: string | undefined;
  @Input() linkClass: string | undefined;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  get id() {
    return `link-${this.link.id}`;
  }

  get dropdownId() {
    return `${this.link.id}-link-dropdown`;
  }

  constructor(
    private element: ElementRef<HTMLElement>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fragmentSubscription = this.route.fragment.subscribe((fragment) => {
      if (fragment === this.id) {
        this.onHighlight();
      }
    });
  }

  ngOnDestroy() {
    if (this.highlightTimeout) {
      clearTimeout(this.highlightTimeout);
    }

    this.fragmentSubscription?.unsubscribe();
  }

  onImageError() {
    this.imageError = true;
  }

  onLinkClick(e: MouseEvent) {
    if ((<HTMLElement>e.target).className?.includes?.('dropdown')) {
      e.preventDefault();
    }
  }

  private onCopy() {
    copy(this.link.link);
  }

  private onEdit() {
    this.edit.emit(this.link.id);
  }

  private onDelete() {
    this.delete.emit(this.link.id);
  }

  private onHighlight() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        replaceUrl: true,
        fragment: undefined,
      },
    );

    this.element.nativeElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });

    this.linkHighlight = true;

    this.highlightTimeout = setTimeout(() => {
      this.linkHighlight = false;
      this.highlightTimeout = undefined;
    }, 300);
  }
}
