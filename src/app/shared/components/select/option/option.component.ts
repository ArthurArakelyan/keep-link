import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

// Models
import { IOption } from '../../../../core/models/option.model';

@Component({
  selector: 'app-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.scss'],
})
export class OptionComponent {
  @Input({ required: true }) option!: IOption;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Input() set focused(value: boolean) {
    if (value && this.optionElement?.nativeElement) {
      this.optionElement.nativeElement.focus();
    }
  }

  @HostBinding('attr.selected') get attrSelected() { return this.selected ? '' : null; }

  @ViewChild('optionElement', { static: true }) optionElement: ElementRef<HTMLButtonElement> | undefined;

  @Output() optionClick = new EventEmitter<IOption>();

  onClick() {
    this.optionClick.emit(this.option);
  }
}
