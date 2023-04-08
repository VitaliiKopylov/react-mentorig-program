import type { Preview } from "@storybook/react";

import '../src/assets/styles/typography.css';
import '../src/assets/styles/vars.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'app-bg',
      values: [
        {
          name: 'app-bg',
          value: '#555555',
        },
      ],
    },
  },
};

export default preview;
