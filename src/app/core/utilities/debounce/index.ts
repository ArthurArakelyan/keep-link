export const debounce = <T> (fn: T, delay: number): T => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounceFunction = (...args: unknown[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      (<(...args: unknown[]) => unknown>fn)(...args);
    }, delay);
  };

  return debounceFunction as unknown as T;
};
