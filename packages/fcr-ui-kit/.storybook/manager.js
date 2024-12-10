import { addons } from '@storybook/addons';
import { theme } from './customize-theme';

addons.setConfig({
  theme: theme,
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    preview: {
      hidden: true,
    },
    showToolbar: false,
  },
});
