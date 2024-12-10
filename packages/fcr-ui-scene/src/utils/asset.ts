import { isElectron, isProduction } from './check';

export const getAssetURL = (relativeURL: string) => {
  if (isElectron() && isProduction) {
    if (!window.require) return;
    const path = window.require('path');
    return isProduction
      ? //@ts-ignore
        `${window.process.resourcesPath}/assets/${relativeURL}`
      : // for local development
        path.resolve(`./public/assets/${relativeURL}`);
  }
  return `./assets/${relativeURL}`;
};
