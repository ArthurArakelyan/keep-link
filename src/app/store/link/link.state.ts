// Models
import { ILink } from '../../core/models/link.model';

export interface LinkState {
  list: ILink[];
  loading: {
    getLinks: boolean;
  };
}
