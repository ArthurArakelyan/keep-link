// Models
import { ILink } from '../../core/models/link.model';

export interface LinkState {
  list: ILink[];
  loading: {
    getLinks: boolean;
    addLink: boolean;
    editLink: boolean;
  };
  error: {
    getLinks: boolean;
  };
}
