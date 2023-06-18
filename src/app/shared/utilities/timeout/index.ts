export const timeout = <T = any>(timeout: number, data?: T) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
};
