export const VALIDATION_LENGTHS = {
  short: 64,
  base: 128,
  long: 256,
};

export const MIN_VALIDATION_LENGTHS = {
  short: 6,
  base: 8,
};

export const validationMessages = {
  required: () => 'Required',
  email: () => 'Invalid email address',
  maxlength: (data: { requiredLength: number }) => `Text is too long (maximum is ${data.requiredLength})`,
  minlength: (data: { requiredLength: number }) => `At least ${data.requiredLength} characters needed`,
  match: (data: { message: string }) => data.message,
};
