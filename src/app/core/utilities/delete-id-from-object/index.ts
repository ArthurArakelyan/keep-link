// Utilities
import { copyObject } from '../copy-object';

// Models
import { IOptionalId } from '../../models/id.model';

export const deleteIdFromObject = <T>(object: T): T => {
  try {
    const objectCopy = copyObject<T>(object);

    delete (<IOptionalId>objectCopy).id;

    return objectCopy;
  } catch (e) {
    console.error(e);
    return object;
  }
};
