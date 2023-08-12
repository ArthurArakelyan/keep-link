// Models
import { IFolder } from '../../models/folder.model';
import { ISize } from '../../models/size.model';

export const alignFolders = (folders: IFolder[], size: ISize): IFolder[][] => {
  if (size._600) {
    return [folders];
  }

  const alignedFolders: IFolder[][] = [];

  let step: number;

  if (size._1000) {
    step = 2;
  } else {
    step = 3;
  }

  for (let j = 0; j < step; j++) {
    alignedFolders.push([]);
  }

  for (let i = 0; i < folders.length; i += step) {
    for (let j = 0; j < step; j++) {
      const item = folders[i + j];

      if (item) {
        alignedFolders[j].push(item);
      }
    }
  }

  return alignedFolders;
};
