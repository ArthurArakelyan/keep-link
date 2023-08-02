// Models
import { ISize } from '../../models/size.model';

export const getSize = (): ISize => {
  return {
    _1000: window.matchMedia('(max-width: 1000px)').matches,
    _768: window.matchMedia('(max-width: 768px)').matches,
    _600: window.matchMedia('(max-width: 600px)').matches,
  };
};
