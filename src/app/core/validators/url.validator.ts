import { AbstractControl, ValidationErrors } from '@angular/forms';

export const urlRegexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const urlValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (urlRegexp.test(value)) {
    return null;
  }

  return {
    url: {
      message: 'The URL is wrong',
    },
  };
};
