export interface AuthState {
  isAuth: boolean;
  loading: {
    login: boolean;
    signup: boolean;
  };
}
