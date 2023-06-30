import { ILink } from './link.model';

export interface IFolder {
  id: string;
  name: string;
  description?: string;
  links: ILink[];
}
