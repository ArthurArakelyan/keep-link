import { IUser } from '../../core/models/user.model';

export interface UserState {
  user: IUser | null;
  loading: {
    editUserName: boolean;
    editUserAvatar: boolean;
    deleteUserAvatar: boolean;
    editUserEmail: boolean;
    editUserPassword: boolean;
  };
}
