export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type IUserWithoutId = Omit<IUser, 'id'>;
