import { trigger, animate, style, transition } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s ease', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.2s ease', style({ opacity: 0 })),
  ]),
]);
