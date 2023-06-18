import { ValidationErrors } from '@angular/forms';

import { validationMessages } from '../../constants/validation';

export const getErrorMessage = (error?: ValidationErrors | null): string => {
  try {
    if (!error) {
      return '';
    }

    const keys = Object.keys(error);

    const firstKey = <keyof typeof validationMessages>keys[0];
    const firstError = error[firstKey];

    const validationMessageGetter = validationMessages[firstKey];

    if (!validationMessageGetter) {
      return '';
    }

    return validationMessageGetter(firstError);
  } catch (e) {
    console.error(e);
    return '';
  }
};
