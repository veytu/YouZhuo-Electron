const path = require('path');
const postcss = require('../../fcr-ui-scene/postcss.config');

module.exports = {
  typescript: {
    reactDocgen: 'react-docgen',
  },
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          postcssOptions: postcss,
          // When using postCSS 8
          implementation: require('postcss'),
        },
      },
    },
  ],

  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    // config.resolve.alias['@ui-kit-utils'] = path.resolve(
    //   ROOT_PATH,
    //   '../src/utils',
    // );
    return config;
  },
};
