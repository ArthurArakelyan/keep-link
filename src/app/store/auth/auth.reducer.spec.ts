import * as fromAuth from './index';

describe('auth', () => {
  const mockLoginData = { email: 'admin@mail.loc', password: '123456' };
  const mockSignupData = { name: 'Admin', email: 'admin@mail.loc', password: '123456' };

  describe('login', () => {
    it('should set the login loading to true', () => {
      const { initialState, authReducer, login } = fromAuth;
      const action = login({ payload: mockLoginData });
      const state = authReducer(initialState, action);

      expect(state.loading.login).toBeTrue();
    });
  });

  describe('loginFulfilled', () => {
    it('should set isAuth to true', () => {
      const { initialState, authReducer, loginFulfilled } = fromAuth;
      const action = loginFulfilled();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeTrue();
    });

    it('should set the login loading to false', () => {
      const { initialState, authReducer, loginFulfilled } = fromAuth;
      const action = loginFulfilled();
      const state = authReducer(initialState, action);

      expect(state.loading.login).toBeFalse();
    });
  });

  describe('loginRejected', () => {
    it('should set isAuth to false', () => {
      const { initialState, authReducer, loginRejected } = fromAuth;
      const action = loginRejected();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeFalse();
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
    it('should set isAuth to true', () => {
      const { initialState, authReducer, signupFulfilled } = fromAuth;
      const action = signupFulfilled();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeTrue();
    });

    it('should set the signup loading to false', () => {
      const { initialState, authReducer, signupFulfilled } = fromAuth;
      const action = signupFulfilled();
      const state = authReducer(initialState, action);

      expect(state.loading.signup).toBeFalse();
    });
  });

  describe('signupRejected', () => {
    it('should set isAuth to false', () => {
      const { initialState, authReducer, signupRejected } = fromAuth;
      const action = signupRejected();
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBeFalse();
    });

    it('should set the signup loading to false', () => {
      const { initialState, authReducer, signupRejected } = fromAuth;
      const action = signupRejected();
      const state = authReducer(initialState, action);

      expect(state.loading.signup).toBeFalse();
    });
  });
});
