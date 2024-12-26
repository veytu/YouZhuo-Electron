#base/sh
rm -rf packages/agora-demo-app/release
# 打包 SDK JS 代码
yarn pack:classroom:sdk
# 打包插件 JS 代码
yarn pack:classroom:plugin
# 打包应用程序代码
yarn ci:build
# 打包 Electron Windows 客户端
yarn pack:electron:win

