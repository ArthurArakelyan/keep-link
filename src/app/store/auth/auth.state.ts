export interface AuthState {
  id: string | null;
  isAuth: boolean;
  loading: {
    login: boolean;
    signup: boolean;
  };
}
