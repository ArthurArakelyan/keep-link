import { trigger, animate, style, transition } from '@angular/animations';

const open = style({ opacity: 1, transform: 'translateY(0)' });

const hide = style({ opacity: 0, transform: 'translateY(-0.5rem)' });

export const fadeTranslateInOut = trigger('fadeTranslateInOut', [
  transition(':enter', [
    hide,
    animate('0.2s ease', open),
  ]),
  transition(':leave', [
    animate('0.2s ease', hide),
  ]),
]);
