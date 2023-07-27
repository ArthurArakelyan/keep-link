import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

// Animations
import { fadeTranslateInOut } from '../../../core/animations/fade-translate-in-out.animation';

// Constants
import { keys } from '../../../core/constants/keys';

// Models
import { IDropdownOption } from '../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
  animations: [fadeTranslateInOut],
})
export class DropdownComponent implements OnInit {
  open: boolean = false;

  leftStyle: number = 0;
  top: number = 0;
  left: number = 0;
  width: number = 0;
  height: number = 0;
  dropdownWidth: number = 0;

  @Input({ required: true }) options: IDropdownOption[] = [];
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) label: string = '';
  @Input() position: 'left' | 'center' | 'right' = 'left';
  @Input() trigger: 'hover' | 'click' = 'hover';

  @ViewChild('dropdown', { static: false }) dropdown: ElementRef<HTMLDivElement> | undefined;

  @HostBinding('attr.tabindex') tabindex = '0';
  @HostBinding('attr.role') role = 'combobox';
  @HostBinding('attr.aria-label') get ariaLabel() { return this.label; }
  @HostBinding('attr.aria-controls') get ariaControls() { return this.id; }
  @HostBinding('attr.aria-owns') get ariaOwns() { return this.id; }
  @HostBinding('attr.aria-expanded') get ariaExpanded() { return this.open.toString(); }

  @HostListener('document:click', ['$event'])
  private onGlobalClick(event: MouseEvent): void {
    if (this.open && !this.element.nativeElement.contains(<HTMLElement>event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onGlobalKeyDown(e: KeyboardEvent) {
    if (document.activeElement === this.element.nativeElement) {
      if (e.key === keys.space || e.key === keys.enter) {
        this.openDropdown();
        return;
      }
    }

    if (e.key === keys.esc && this.open) {
      this.closeDropdown();
    }
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    if (this.trigger !== 'click') {
      return;
    }

    if (!(<HTMLElement>event.target).className?.includes?.('dropdown')) {
      if (this.open) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
  }

  @HostListener('mouseenter')
  private onMouseEnter() {
    if (this.trigger !== 'hover') {
      return;
    }

    this.openDropdown();
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    if (this.trigger !== 'hover') {
      return;
    }

    this.closeDropdown();
  }

  constructor(
    private element: ElementRef<HTMLElement>,
  ) {}

  ngOnInit() {
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.trigger = 'click';
    }
  }

  onOptionClick(action: () => void) {
    this.closeDropdown();
    action();
  }

  private openDropdown() {
    this.initializeRect();
    this.initializeDropdownRect();

    this.calculatePosition();

    this.open = true;
  }

  private closeDropdown() {
    this.open = false;
  }

  private initializeRect() {
    const rect = this.element.nativeElement.getBoundingClientRect();

    this.top = rect.top;
    this.left = rect.left;
    this.width = rect.width;
    this.height = rect.height;
  }

  private initializeDropdownRect() {
    if (!this.dropdown || !this.dropdown.nativeElement) {
      return;
    }

    const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();

    this.dropdownWidth = dropdownRect.width;
  }

  private calculatePosition() {
    if (this.position === 'right') {
      this.leftStyle = (this.left - this.dropdownWidth) + this.width;
    } else if (this.position === 'center') {
      this.leftStyle = this.left - (this.dropdownWidth / 2) + (this.width / 2);
    } else if (this.position === 'left') {
      this.leftStyle = this.left;
    }
  }
}
