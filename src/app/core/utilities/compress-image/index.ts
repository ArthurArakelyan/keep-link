import { from } from 'rxjs';

export const compressImage = (file: File, options?: { minimumSize?: number; quality?: number; type?: string; }) => {
  return from((async () => {
    try {
      const { minimumSize = -1, quality = 1, type = file.type } = (options || {});

      if (file.size < minimumSize) {
        return file;
      }

      // Get as image data
      const imageBitmap = await createImageBitmap(file);

      // Draw to canvas
      const canvas = document.createElement('canvas');
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return file;
      }

      ctx.drawImage(imageBitmap, 0, 0);

      // Turn into Blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve as (blob: Blob | null) => void, type, quality)
      ) as Blob;

      // Turn Blob into File
      return new File([blob], file.name, {
        type: blob.type,
      });
    } catch (e) {
      console.error(e);
      return file;
    }
  })());
};
