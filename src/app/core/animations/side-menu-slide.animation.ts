import { trigger, animate, style, transition } from '@angular/animations';

const open = style({ opacity: 1, transform: 'translateX(0)' });

const hide = style({ opacity: 0, transform: 'translateX(-30rem)' });

export const sideMenuSlideAnimation = trigger('sideMenuSlide', [
  transition(':enter', [
    hide,
    animate('0.3s ease-in-out', open),
  ]),
  transition(':leave', [
    animate('0.3s ease-in-out', hide),
  ]),
]);
