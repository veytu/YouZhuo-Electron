#base/sh
cd packages/agora-classroom-sdk
rm -rf lib
yarn ci:build

cd ../agora-plugin-gallery
rm -rf lib
yarn ci:build

cd ../agora-proctor-sdk
rm -rf lib
yarn ci:build

cd ../fcr-ui-scene
rm -rf lib
yarn ci:build

cd ../agora-demo-app
rm -rf build

cd ../../
yarn ci:build