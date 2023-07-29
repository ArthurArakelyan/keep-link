// Models
import { ILink } from '../../core/models/link.model';

export interface LinkState {
  list: ILink[];
  loading: {
    getLinks: boolean;
    addLink: boolean;
    editLink: boolean;
    deleteLink: boolean;
  };
  error: {
    getLinks: boolean;
  };
}
