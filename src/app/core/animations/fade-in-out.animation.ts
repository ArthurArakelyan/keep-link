import { trigger, animate, style, transition } from '@angular/animations';

const open = style({ opacity: 1 });

const hide = style({ opacity: 0 });

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    hide,
    animate('0.2s ease', open),
  ]),
  transition(':leave', [
    animate('0.2s ease', hide),
  ]),
]);
