import { animate, group, query, style, transition, trigger } from '@angular/animations';

const openOverlay = style({ backgroundColor: 'rgba(0, 0, 0, 0.6)' });
const openContent = style({ opacity: 1, transform: 'scale(1)' });

const hideOverlay = style({ backgroundColor: 'rgba(0, 0, 0, 0)' });
const hideContent = style({ opacity: 0, transform: 'scale(0.8)' });

export const modalTranslateAnimation = trigger('modalTranslate', [
  transition(':enter', [
    group([
      query('.modal-overlay', hideOverlay),
      query('.modal-overlay', animate('0.2s ease', openOverlay)),

      query('.modal-content', hideContent),
      query('.modal-content', animate('0.2s ease', openContent)),
    ]),
  ]),
  transition(':leave', [
    group([
      query('.modal-overlay', animate('0.2s ease', hideOverlay)),

      query('.modal-content', animate('0.2s ease', hideContent)),
    ]),
  ]),
]);
