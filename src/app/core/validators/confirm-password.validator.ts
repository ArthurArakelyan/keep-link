import { AbstractControl, ValidationErrors } from '@angular/forms';

export const confirmPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent) {
    return null;
  }

  const confirmPassword = control.value;
  const password = control.parent.get('password')?.value;

  if (confirmPassword === password && confirmPassword !== '') {
    return null;
  }

  return {
    match: {
      message: 'The password doesn\'t match',
    },
  };
};
