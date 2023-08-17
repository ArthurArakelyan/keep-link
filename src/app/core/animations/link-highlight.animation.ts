import { trigger, animate, style, transition } from '@angular/animations';

const open = style({ backgroundColor: 'var(--highlight-color)' });

const hide = style({ backgroundColor: 'transparent' });

export const linkHighlight = trigger('linkHighlight', [
  transition(':enter', [
    hide,
    animate('0.3s ease', open),
  ]),
  transition(':leave', [
    animate('0.3s ease', hide),
  ]),
]);
