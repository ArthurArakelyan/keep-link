export const parseJson = <T>(json: string | null): T | null => {
  try {
    if (!json) {
      return null;
    }

    return <T>JSON.parse(json);
  } catch (e) {
    console.error(e);
    return null;
  }
};
