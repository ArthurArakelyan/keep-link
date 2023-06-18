import * as fromTheme from './index';

describe('theme', () => {
  describe('changeTheme', () => {
    it('should set the theme to a new theme from payload', () => {
      const { initialState, changeTheme, themeReducer } = fromTheme;
      const newTheme = 'dark';
      const action = changeTheme({ payload: newTheme });
      const state = themeReducer(initialState, action);

      expect(state.theme).toBe(newTheme);
    });

    it('should set the isChanged to true when the theme is changed', () => {
      const { initialState, changeTheme, themeReducer } = fromTheme;
      const action = changeTheme({ payload: 'light' });
      const state = themeReducer(initialState, action);

      expect(state.isChanged).toBeTrue();
    });
  });
});
