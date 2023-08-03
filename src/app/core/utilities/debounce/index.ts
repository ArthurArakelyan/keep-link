export const debounce = <T extends Function> (fn: T, delay: number): T => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounceFunction = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounceFunction as unknown as T;
};
