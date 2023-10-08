import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import docJson from '../documentation.json';

setCompodocJson(docJson);

const viewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '600px',
    },
  },
};

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: viewports,
    },
  },
};

export default preview;
