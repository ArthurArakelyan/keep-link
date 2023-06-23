import * as fromUser from './index';

// Models
import { IUser } from '../../core/models/user.model';

describe('user', () => {
  describe('getUserFulfilled, addUserFulfilled', () => {
    it('should set the user to a new user from payload', () => {
      const { initialState, getUserFulfilled, userReducer } = fromUser;
      const newUser: IUser = { id: '1234', name: 'Test', email: 'test@mail.loc', avatar: '' };
      const action = getUserFulfilled({ payload: newUser });
      const state = userReducer(initialState, action);

      expect(state.user).toBe(newUser);
    });
  });

  describe('getUserRejected', () => {
    it('should set the user to null', () => {
      const { initialState, getUserRejected, userReducer } = fromUser;
      const action = getUserRejected();
      const state = userReducer(initialState, action);

      expect(state.user).toBe(null);
    });
  });
});
