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
  });

  describe('changePreferredTheme', () => {
    it('should set the preferred theme to a new theme from payload', () => {
      const { initialState, changePreferredTheme, themeReducer } = fromTheme;
      const newTheme = 'dark';
      const action = changePreferredTheme({ payload: newTheme });
      const state = themeReducer(initialState, action);

      expect(state.preferredTheme).toBe(newTheme);
    });
  });

  describe('changePreferredContrast', () => {
    it('should set the preferred contrast to a new theme from payload', () => {
      const { initialState, changePreferredContrast, themeReducer } = fromTheme;
      const contrast = true;
      const action = changePreferredContrast({ payload: contrast });
      const state = themeReducer(initialState, action);

      expect(state.preferredContrast).toBe(contrast);
    });
  });

  describe('changeColor', () => {
    it('should set the preferred contrast to a new theme from payload', () => {
      const { initialState, changeColor, themeReducer } = fromTheme;
      const color = 'orange';
      const action = changeColor({ payload: color });
      const state = themeReducer(initialState, action);

      expect(state.color).toBe(color);
    });
  });
});
