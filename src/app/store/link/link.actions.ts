import { createAction, props } from '@ngrx/store';

// Models
import { ILink, ILinkCreateData, ILinkWithoutId } from '../../core/models/link.model';

export const getLinks = createAction(
  '[Link] Get links',
);

export const getLinksFulfilled = createAction(
  '[Link] Get links fulfilled',
  props<{
    payload: ILink[];
  }>(),
);

export const getLinksRejected = createAction(
  '[Link] Get links rejected',
);

export const addLink = createAction(
  '[Link] Add link',
  props<{
    payload: ILinkCreateData;
  }>(),
);

export const addLinkFulfilled = createAction(
  '[Link] Add link fulfilled',
);

export const addLinkRejected = createAction(
  '[Link] Add link rejected',
);

export const editLink = createAction(
  '[Link] Edit link',
  props<{
    payload: {
      id: string;
      link: ILinkWithoutId;
    },
  }>(),
);

export const editLinkFulfilled = createAction(
  '[Link] Edit link fulfilled',
);

export const editLinkRejected = createAction(
  '[Link] Edit link rejected',
);

export const deleteLink = createAction(
  '[Link] Delete link',
  props<{
    payload: string;
  }>(),
);

export const deleteLinkFulfilled = createAction(
  '[Link] Delete link fulfilled',
);

export const deleteLinkRejected = createAction(
  '[Link] Delete link rejected',
);
