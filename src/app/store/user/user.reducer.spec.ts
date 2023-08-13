import * as fromUser from './index';

// Models
import { IUser } from '../../core/models/user.model';
import {
  deleteUser, deleteUserFulfilled, deleteUserRejected,
  editUserAvatarFulfilled,
  editUserAvatarRejected,
  editUserEmail, editUserEmailFulfilled,
  editUserEmailRejected,
  editUserNameFulfilled, editUserPassword
} from './index';

describe('user', () => {
  describe('getUserFulfilled', () => {
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

  describe('addUserFulfilled', () => {
    it('should set the user to a new user from payload', () => {
      const { initialState, addUserFulfilled, userReducer } = fromUser;
      const newUser: IUser = { id: '1234', name: 'Test', email: 'test@mail.loc', avatar: '' };
      const action = addUserFulfilled({ payload: newUser });
      const state = userReducer(initialState, action);

      expect(state.user).toBe(newUser);
    });
  });

  describe('editUserName', () => {
    it('should set the editUserName loading to true', () => {
      const { initialState, editUserName, userReducer } = fromUser;
      const action = editUserName({ payload: { name: 'Name' } });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserName).toBeTrue();
    });
  });

  describe('editUserNameFulfilled', () => {
    it('should set the user name to a new from payload', () => {
      const { initialState, editUserNameFulfilled, userReducer } = fromUser;
      const newName = 'Name';
      const action = editUserNameFulfilled({ payload: { name: newName } });
      const state = userReducer(
        {
          ...initialState,
          user: {
            name: 'Test',
            email: '',
            avatar: '',
            id: '1',
          },
        },
        action,
      );

      expect(state.user?.name).toBe(newName);
    });

    it('should not set the user name to a new from payload when user doesn\'t exist', () => {
      const { initialState, editUserNameFulfilled, userReducer } = fromUser;
      const newName = 'Name';
      const action = editUserNameFulfilled({ payload: { name: newName } });
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
    });

    it('should set the editUserName loading to false', () => {
      const { initialState, editUserNameFulfilled, userReducer } = fromUser;
      const action = editUserNameFulfilled({ payload: { name: 'Name' } });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserName).toBeFalse();
    });
  });

  describe('editUserNameRejected', () => {
    it('should set the editUserName loading to false', () => {
      const { initialState, editUserNameRejected, userReducer } = fromUser;
      const action = editUserNameRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.editUserName).toBeFalse();
    });
  });

  describe('editUserAvatar', () => {
    it('should set the editUserAvatar loading to true', () => {
      const { initialState, editUserAvatar, userReducer } = fromUser;
      const action = editUserAvatar({ payload: new File([], '') });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserAvatar).toBeTrue();
    });
  });

  describe('editUserAvatarFulfilled', () => {
    it('should set the user avatar to a new from payload', () => {
      const { initialState, editUserAvatarFulfilled, userReducer } = fromUser;
      const newAvatar = 'Avatar';
      const action = editUserAvatarFulfilled({ payload: { avatar: newAvatar } });
      const state = userReducer(
        {
          ...initialState,
          user: {
            name: '',
            email: '',
            avatar: '',
            id: '1',
          },
        },
        action,
      );

      expect(state.user?.avatar).toBe(newAvatar);
    });

    it('should not set the user avatar to a new from payload when user doesn\'t exist', () => {
      const { initialState, editUserAvatarFulfilled, userReducer } = fromUser;
      const newAvatar = 'Avatar';
      const action = editUserAvatarFulfilled({ payload: { avatar: newAvatar } });
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
    });

    it('should set the editUserAvatar loading to false', () => {
      const { initialState, editUserAvatarFulfilled, userReducer } = fromUser;
      const action = editUserAvatarFulfilled({ payload: { avatar: 'Avatar' } });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserAvatar).toBeFalse();
    });
  });

  describe('editUserAvatarRejected', () => {
    it('should set the editUserAvatar loading to false', () => {
      const { initialState, editUserAvatarRejected, userReducer } = fromUser;
      const action = editUserAvatarRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.editUserAvatar).toBeFalse();
    });
  });

  describe('deleteUserAvatar', () => {
    it('should set the deleteUserAvatar loading to true', () => {
      const { initialState, deleteUserAvatar, userReducer } = fromUser;
      const action = deleteUserAvatar();
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUserAvatar).toBeTrue();
    });
  });

  describe('deleteUserAvatarFulfilled', () => {
    it('should reset the user avatar', () => {
      const { initialState, deleteUserAvatarFulfilled, userReducer } = fromUser;
      const action = deleteUserAvatarFulfilled();
      const state = userReducer(
        {
          ...initialState,
          user: {
            name: '',
            email: '',
            avatar: 'Avatar',
            id: '1',
          },
        },
        action,
      );

      expect(state.user?.avatar).toBe('');
    });

    it('should not reset the user avatar when user doesn\'t exist', () => {
      const { initialState, deleteUserAvatarFulfilled, userReducer } = fromUser;
      const action = deleteUserAvatarFulfilled();
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
    });

    it('should set the deleteUserAvatar loading to false', () => {
      const { initialState, deleteUserAvatarRejected, userReducer } = fromUser;
      const action = deleteUserAvatarRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUserAvatar).toBeFalse();
    });
  });

  describe('deleteUserAvatarRejected', () => {
    it('should set the deleteUserAvatar loading to false', () => {
      const { initialState, deleteUserAvatarRejected, userReducer } = fromUser;
      const action = deleteUserAvatarRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUserAvatar).toBeFalse();
    });
  });

  describe('editUserEmail', () => {
    it('should set the editUserEmail loading to true', () => {
      const { initialState, editUserEmail, userReducer } = fromUser;
      const payload = { email: 'email@mail.loc', password: 'example' };
      const action = editUserEmail({ payload });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserEmail).toBeTrue();
    });
  });

  describe('editUserEmailFulfilled', () => {
    it('should set the user email to a new from payload', () => {
      const { initialState, editUserEmailFulfilled, userReducer } = fromUser;
      const newEmail = 'mail@mail.loc';
      const action = editUserEmailFulfilled({ payload: { email: newEmail } });
      const state = userReducer(
        {
          ...initialState,
          user: {
            name: '',
            email: '',
            avatar: '',
            id: '1',
          },
        },
        action,
      );

      expect(state.user?.email).toBe(newEmail);
    });

    it('should not set the user email to a new from payload when user doesn\'t exist', () => {
      const { initialState, editUserEmailFulfilled, userReducer } = fromUser;
      const newEmail = 'mail@mail.loc';
      const action = editUserEmailFulfilled({ payload: { email: newEmail } });
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
    });

    it('should set the editUserEmail loading to false', () => {
      const { initialState, editUserEmailFulfilled, userReducer } = fromUser;
      const newEmail = 'mail@mail.loc';
      const action = editUserEmailFulfilled({ payload: { email: newEmail } });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserEmail).toBeFalse();
    });
  });

  describe('editUserEmailRejected', () => {
    it('should set the editUserEmail loading to false', () => {
      const { initialState, editUserEmailRejected, userReducer } = fromUser;
      const action = editUserEmailRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.editUserEmail).toBeFalse();
    });
  });

  describe('editUserPassword', () => {
    it('should set the editUserPassword loading to true', () => {
      const { initialState, editUserPassword, userReducer } = fromUser;
      const payload = { oldPassword: 'example', password: 'example' };
      const action = editUserPassword({ payload });
      const state = userReducer(initialState, action);

      expect(state.loading.editUserPassword).toBeTrue();
    });
  });

  describe('editUserPasswordFulfilled', () => {
    it('should set the editUserPassword loading to false', () => {
      const { initialState, editUserPasswordFulfilled, userReducer } = fromUser;
      const action = editUserPasswordFulfilled();
      const state = userReducer(initialState, action);

      expect(state.loading.editUserPassword).toBeFalse();
    });
  });

  describe('editUserPasswordRejected', () => {
    it('should set the editUserPassword loading to false', () => {
      const { initialState, editUserPasswordRejected, userReducer } = fromUser;
      const action = editUserPasswordRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.editUserPassword).toBeFalse();
    });
  });

  describe('deleteUser', () => {
    it('should set the deleteUser loading to true', () => {
      const { initialState, deleteUser, userReducer } = fromUser;
      const payload = { password: 'example' };
      const action = deleteUser({ payload });
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUser).toBeTrue();
    });
  });

  describe('deleteUserFulfilled', () => {
    it('should set the deleteUser loading to false', () => {
      const { initialState, deleteUserFulfilled, userReducer } = fromUser;
      const action = deleteUserFulfilled();
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUser).toBeFalse();
    });
  });

  describe('deleteUserRejected', () => {
    it('should set the deleteUser loading to false', () => {
      const { initialState, deleteUserRejected, userReducer } = fromUser;
      const action = deleteUserRejected();
      const state = userReducer(initialState, action);

      expect(state.loading.deleteUser).toBeFalse();
    });
  });
});
