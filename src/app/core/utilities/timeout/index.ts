export const timeout = <T>(timeout: number, data?: T) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
};
