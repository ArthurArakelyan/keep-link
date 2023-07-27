export interface ILink {
  userId: string;
  folderId: string | null;
  id: string;
  name: string;
  link: string;
  image: string;
  createdAt: number;
}

export type ILinkWithoutId = Omit<ILink, 'id'>;

export type ILinkCreateData = Omit<Omit<ILinkWithoutId, 'createdAt'>, 'userId'>;
