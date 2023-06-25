// Models
import { ISize } from '../../models/size.model';

export const getSize = (): ISize => {
  return {
    _768: window.matchMedia('(max-width: 768px)').matches,
  };
};
