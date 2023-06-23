import * as fromAuth from './index';

describe('auth', () => {
  const mockLoginData = { email: 'admin@mail.loc', password: '123456' };
  const mockSignupData = { name: 'Admin', email: 'admin@mail.loc', password: '123456' };
  const mockUid = 'uid';

  describe('login', () => {
    it('should set the login loading to true', () => {
      const { initialState, authReducer, login } = fromAuth;
      const action = login({ payload: mockLoginData });
      const state = authReducer(initialState, action);

      expect(state.loading.login).toBeTrue();
    });
  });

  describe('loginFulfilled', () => {
    it('should set isAuth to true and initialize id', () => {
      const { initialState, authReducer, loginFulfilled } = fromAuth;
      const action = loginFulfilled({ payload: mockUid });
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeTrue();
      expect(state.id).toBe(mockUid);
    });

    it('should set the login loading to false', () => {
      const { initialState, authReducer, loginFulfilled } = fromAuth;
      const action = loginFulfilled({ payload: mockUid });
      const state = authReducer(initialState, action);

      expect(state.loading.login).toBeFalse();
    });
  });

  describe('loginRejected', () => {
    it('should set isAuth to false and reset id', () => {
      const { initialState, authReducer, loginRejected } = fromAuth;
      const action = loginRejected();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeFalse();
      expect(state.id).toBe(null);
    });

    it('should set the login loading to false', () => {
      const { initialState, authReducer, loginRejected } = fromAuth;
      const action = loginRejected();
      const state = authReducer(initialState, action);

      expect(state.loading.login).toBeFalse();
    });
  });

  describe('signup', () => {
    it('should set the signup loading to true', () => {
      const { initialState, authReducer, signup } = fromAuth;
      const action = signup({ payload: mockSignupData });
      const state = authReducer(initialState, action);

      expect(state.loading.signup).toBeTrue();
    });
  });

  describe('signupFulfilled', () => {
    it('should set isAuth to true and initialize id', () => {
      const { initialState, authReducer, signupFulfilled } = fromAuth;
      const action = signupFulfilled({ payload: mockUid });
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeTrue();
      expect(state.id).toBe(mockUid);
    });

    it('should set the signup loading to false', () => {
      const { initialState, authReducer, signupFulfilled } = fromAuth;
      const action = signupFulfilled({ payload: mockUid });
      const state = authReducer(initialState, action);

      expect(state.loading.signup).toBeFalse();
    });
  });

  describe('signupRejected', () => {
    it('should set isAuth to false and reset id', () => {
      const { initialState, authReducer, signupRejected } = fromAuth;
      const action = signupRejected();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeFalse();
      expect(state.id).toBe(null);
    });

    it('should set the signup loading to false', () => {
      const { initialState, authReducer, signupRejected } = fromAuth;
      const action = signupRejected();
      const state = authReducer(initialState, action);

      expect(state.loading.signup).toBeFalse();
    });
  });
});
