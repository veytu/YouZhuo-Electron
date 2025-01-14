#base/sh
npm pkg set agora_electron.electron_version="12.0.0"
npm pkg set agora_electron.prebuilt=true
npm pkg set agora_electron.arch="x64"
npm pkg set agora_electron.platform="win32"

rm -rf node_modules/agora-electron-sdk
yarn --check-files
rm -rf packages/agora-demo-app/release
# 打包 SDK JS 代码
yarn pack:classroom:sdk
# 打包插件 JS 代码
yarn pack:classroom:plugin
# 打包应用程序代码
sh build.sh
# 打包 Electron Windows 客户端
yarn pack:electron:win

