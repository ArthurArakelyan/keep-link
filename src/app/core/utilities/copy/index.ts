import { from } from 'rxjs';

export const copy = (text: string) => {
  if (!navigator?.clipboard?.writeText) {
    throw new Error('Device can\'t copy to the clipboard');
  }

  return from(navigator.clipboard.writeText(text));
};
