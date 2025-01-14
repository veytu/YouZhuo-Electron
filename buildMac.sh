#base/sh
npm pkg delete agora_electron
rm -rf node_modules/agora-electron-sdk
yarn --check-files
rm -rf packages/agora-demo-app/release
# 打包 SDK JS 代码
yarn pack:classroom:sdk
# 打包插件 JS 代码
yarn pack:classroom:plugin
# 打包应用程序代码
sh build.sh
# 打包 Electron macOS 客户端
yarn pack:electron:mac
