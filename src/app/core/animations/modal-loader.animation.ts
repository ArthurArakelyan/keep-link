import { animate, group, query, style, transition, trigger } from '@angular/animations';

const openLoaderWrapper = style({ backgroundColor: 'rgba(0, 0, 0, 0.4)' });
const openLoader = style({ opacity: 1 });

const hideLoaderWrapper = style({ backgroundColor: 'rgba(0, 0, 0, 0)' });
const hideLoader = style({ opacity: 0 });

export const modalLoaderAnimation = trigger('modalLoaderAnimation', [
  transition(':enter', [
    group([
      hideLoaderWrapper,
      animate('0.3s ease', openLoaderWrapper),
      query('.modal-loader', hideLoader),
      query('.modal-loader', animate('0.3s ease', openLoader)),
    ]),
  ]),
  transition(':leave', [
    group([
      animate('0.3s ease', hideLoaderWrapper),
      query('.modal-loader', animate('0.3s ease', hideLoader)),
    ]),
  ]),
]);
