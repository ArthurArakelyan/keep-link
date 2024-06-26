// Constants
import { colors } from '../../constants/colors';

// Models
import { ColorType } from '../../models/color.model';

export const changeFavicon = (colorName: ColorType) => {
  try {
    const icons: (HTMLLinkElement | null)[] = [
      document.head.querySelector<HTMLLinkElement>('link[rel="icon"]'),
      document.head.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]'),
    ];

    const { color } = colors.find((color) => color.name === colorName) || colors[0];

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="${color}" d="M32 0c17.7 0 32 14.3 32 32S49.7 64 32 64 0 49.7 0 32 14.3 0 32 0z"/><path fill="#FFF" d="m48.7 20.1-4.8-4.8c-.8-.8-2-1.3-3.2-1.3s-2.3.5-3.2 1.3L33 20l3.2 3.2 4.6-4.7 4.8 4.7-12.7 12.7-2.7-2.7-3.2 3.2 2.7 2.7c.8.8 2 1.3 3.2 1.3 1.2 0 2.3-.5 3.2-1.3l12.6-12.6c1.7-1.8 1.7-4.7 0-6.4z"/><path fill="#FFF" d="m23.2 45.5-4.8-4.7 12.3-12.2 2.7 2.7 3.2-3.2-2.7-2.7c-.8-.8-2-1.3-3.2-1.3-1.2 0-2.3.5-3.2 1.3L15.3 37.6c-1.8 1.8-1.8 4.6 0 6.4l4.8 4.8c.8.8 2 1.3 3.2 1.3s2.3-.5 3.2-1.3l3.8-3.7-3.3-3.3-3.8 3.7z"/></svg>`;

    const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

    svg = svg.replace(/>\s{1,}</g, `><`);
    svg = svg.replace(/\s{2,}/g, ` `);

    const href = `data:image/svg+xml,${svg.replace(symbols, encodeURIComponent)}`;

    icons.forEach((icon) => {
      if (icon) {
        icon.href = href;
      }
    });
  } catch (e) {
    console.error(e);
  }
};
